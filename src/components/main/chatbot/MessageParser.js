class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    if (message.includes("오늘날씨 어때")) {
      this.actionProvider.greet();
    } else {
      this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser;
