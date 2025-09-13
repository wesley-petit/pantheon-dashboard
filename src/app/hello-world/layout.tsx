import React from 'react';
import Head from 'next/head';

const HelloWorldLayout: React.FC = ({ children }) => {
    return (
        <html lang="en">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Hello World Page</title>
            </Head>
            <body>
                {children}
            </body>
        </html>
    );
};

export default HelloWorldLayout;