import React from 'react';
import HelloWorldLayout from './layout';

const HelloWorldPage: React.FC = () => {
    return (
        <HelloWorldLayout>
            <section>
                <h2>Hello, World!</h2>
                <p>This is the HelloWorld page.</p>
            </section>
        </HelloWorldLayout>
    );
};

export default HelloWorldPage;