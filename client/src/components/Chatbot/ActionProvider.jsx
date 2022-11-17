// ActionProvider starter code
import React from 'react';
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = (message) => {
        console.log('message en handlehello111----', message)
        const botMessage = createChatBotMessage('Hello!!!!. Write the word result to obtain the size according to the data entered. If you want to enter new data, write size');
        setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage], }));

    };
    const handleHello2 = (message) => {
        console.log('message en handlehello222----', message)
        const botMessage = createChatBotMessage('Click in size', {
            widget: "size",
            delay: 500,
        });
        setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage], }));

    };
    const handleHello3 = (message) => {
        console.log('message en handlehello3333----', message)
        const botMessage = createChatBotMessage('Results obtained.', {
            widget: "result",
            delay: 500,
        });
        setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage], }));

    };
    const handleHello4 = (message) => {
        console.log('message en handlehello4444----', message)
        const botMessage = createChatBotMessage('We are sorry, but for now there are no more features avaible. Write the word size, if you want to enter data, or result to obtain the size according to the data entered. ',);
        setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage], }));

    };
    // Put the handleHello function in the actions object to pass to the MessageParser  
    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                        handleHello2,
                        handleHello3,
                        handleHello4,
                    },
                });
            })}
        </div>);
};
export default ActionProvider;