import Document, { Html, Head, Main, NextScript } from "next/document";


class MyDocument extends Document {
    render() {
        return(
            <Html>
                <Head>
                    
                    <link rel="preload" href="/fonts/NetflixSansBlack.ttf" as="font" type="font/ttf" crossOrigin="" />
                    <link rel="preload" href="/fonts/NetflixSansBold.ttf" as="font" type="font/ttf" crossOrigin="" />
                    <link rel="preload" href="/fonts/NetflixSansIcon.ttf" as="font" type="font/ttf" crossOrigin="" />
                    <link rel="preload" href="/fonts/NetflixSansLight.ttf" as="font" type="font/ttf" crossOrigin="" />
                    <link rel="preload" href="/fonts/NetflixSansMediuim.ttf" as="font" type="font/ttf" crossOrigin="" />
                    <link rel="preload" href="/fonts/NetflixSansRegular.ttf" as="font" type="font/ttf" crossOrigin="" />
                    <link rel="preload" href="/fonts/NetflixSansThin.ttf" as="font" type="font/ttf" crossOrigin="" />
                    
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;