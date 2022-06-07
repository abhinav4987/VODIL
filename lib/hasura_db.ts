export async function insertStats(
  token,
  { favourited, userId, watched, videoId, videoType }
) {
  const operationsDoc = `
  mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!, $videoType: String!) {
    insert_stats_one(object: {
      favourited: $favourited,
      user_id: $userId, 
      video_id: $videoId, 
      video_type: $videoType, 
      watched: $watched
      }) {
      user_id
      favourited
      id
      video_id
      video_type
      watched
    }
  }
`;

  return await queryHasuraGQL(
    operationsDoc,
    "insertStats",
    { favourited, userId, watched, videoId: String(videoId), videoType },
    token
  );
}

export async function updateStats(
  token,
  { favourited, userId, watched, videoId, videoType }
) {
  const operationsDoc = `
mutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!, $videoType: String!) {
  update_stats(
    _set: {watched: $watched, favourited: $favourited}, 
    where: {
      user_id: {_eq: $userId}, 
      video_id: {_eq: $videoId},
      video_type: {_eq: $videoType}
    }) {
    returning {
      favourited,
      user_id,
      watched,
      video_id,
      video_type
    }
  }
}
`;

  return await queryHasuraGQL(
    operationsDoc,
    "updateStats",
    { favourited, userId, watched, videoId: String(videoId), videoType },
    token
  );
}

export async function getWatchedVideos(userId, token) {
  const operationsDoc = `
  query watchedVideos($userId: String!) {
    stats(where: {
      watched: {_eq: true}, 
      user_id: {_eq: $userId},
    }) {
      video_id,
      video_type
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "watchedVideos",
    {
      userId,
    },
    token
  );

  return response?.data?.stats;
}

export async function findVideoIdByUser(token:string, userId:string, videoId:string, videoType:string) {
  const operationsDoc = `
  query findVideoIdByUserId(
    $videoId : String!,
    $userId: String!,
    $videoType: String!
  ) {
    stats(where: {
      video_type: {_eq: $videoType}, 
      video_id: {_eq: $videoId}, 
      user_id: {_eq: $userId}
    }) {
      favourited
      id
      user_id
      video_id
      video_type
      watched
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "findVideoIdByUserId",
    {
      videoId :  String(videoId),
      userId,
      videoType
    },
    token
  );
  
  return response?.data?.stats;
}

export async function get_myListVideos(userId: string, token:string) {
  const operationsDoc = `
  query favouritedVideos($userId: String!) {
    stats(where: {
      user_id: {_eq: $userId}, 
      favourited: {_eq: 1}
    }) {
      video_id,
      video_type
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "favouritedVideos",
    {
      userId,
    },
    token
  );
  return response?.data?.stats;
}

export const isNewUser = async (issuer: string | null, jwtToken: string) => {
   
  const operationsDoc = `
    query isNewUser($issuer: String!) {
      users(where: {issuer: {_eq: $issuer}}) {
        email
        id
        issuer
        publicAddress
      }
    }
  `;

  const response =  await queryHasuraGQL(
    operationsDoc,
      "isNewUser",  
      {issuer: issuer},
      jwtToken
  );

  return response?.data?.users?.length === 0;
}                      

export const createNewUser = async ( jwtToken: string, metadata) => {
  
  const {issuer, email, publicAddress} = metadata;

  const operationsDoc = `
    mutation createNewUser(
      $email: String!,
      $issuer: String!,
      $publicAddress: String!
    ) {
      insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
        returning {
          email
          id
          issuer
        }
      }
    }
  `;

  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    {
      issuer, email, publicAddress
    },
    jwtToken
  );
  
  return response;

}



export async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_URL ? process.env.NEXT_PUBLIC_HASURA_URL : '',
    {
      method: "POST",
      headers : {
          "Authorization" : `Bearer ${token}`,
          'Content-type' : "application/json"
      }, 
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}











