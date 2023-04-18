class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet() {
    const greetingMessage =
      this.createChatBotMessage("안녕하세요 무엇을 도와드릴까요?");
    this.updateChatbotState(greetingMessage);
  }

  handleDefault() {
    const defaultMessage = this.createChatBotMessage(
      "이해하지 못했습니다. 다른 질문을 해주세요"
    );
    this.updateChatbotState(defaultMessage);
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
