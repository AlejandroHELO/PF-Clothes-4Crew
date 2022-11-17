// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar";
import Name from "./Name";
import Results from "./Results";
import Size from "./Size";

const config = {
    initialMessages: [createChatBotMessage(`Hello, click on size and complete the form`, {
        widget: "size",
    },
    ),],
    botName: "Clothes 4Crew",
    customComponents: {
        botAvatar: (props) => <BotAvatar {...props} />
    },
    customStyles: {
        // Overrides the chatbot message styles
        botMessageBox: {
            backgroundColor: "#88001b",
        },
        // Overrides the chat button styles
        chatButton: {
            backgroundColor: "#88001b",
        },
    },
    state: {
        name: '',
        size: [],
        result: [],
    },
    // Defines an array of widgets that you want to render with a chatbot message
    widgets: [
        {
            // defines the name you will use to reference to this widget in "createChatBotMessage".
            widgetName: "name",
            // Function that will be called internally to resolve the widget
            widgetFunc: (props) => { <Name {...props} /> },
            // Any props you want the widget to receive on render
            props: {},
            // Any piece of state defined in the state object that you want to pass down to this widget
            mapStateToProps: [
                "name",
            ],
        },
        {
            // defines the name you will use to reference to this widget in "createChatBotMessage".
            widgetName: "size",
            // Function that will be called internally to resolve the widget
            widgetFunc: (props) => <Size {...props} />,
            // Any props you want the widget to receive on render
            props: {},
            // Any piece of state defined in the state object that you want to pass down to this widget
            mapStateToProps: [
                "size",
            ],
        },
        {
            // defines the name you will use to reference to this widget in "createChatBotMessage".
            widgetName: "result",
            // Function that will be called internally to resolve the widget
            widgetFunc: (props) => <Results {...props} />,
            // Any props you want the widget to receive on render
            props: {},
            // Any piece of state defined in the state object that you want to pass down to this widget
            mapStateToProps: [
                "result",
            ],
        },
    ],
}

export default config

