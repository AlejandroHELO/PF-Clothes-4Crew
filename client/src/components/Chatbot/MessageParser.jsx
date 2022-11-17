// MessageParser starter code
import React from 'react';
const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        console.log(message)
        if (message.includes('hello')) {
            console.log("hi!!");
            actions.handleHello(message)

        } else if (message.includes('size')) {
            console.log("hi!!");
            actions.handleHello2(message)

        } else if (message.includes('result')) {
            console.log("hi!!");
            actions.handleHello3(message)

        } else {
            console.log("ninguno");
            actions.handleHello4(message)
        }
    }

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions: {

                    },
                });
            })}
        </div>
    );
};
export default MessageParser;