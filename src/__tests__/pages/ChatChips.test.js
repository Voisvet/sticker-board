import React from 'react';
import renderer from 'react-test-renderer';
import ChatsChips from '../../pages/Main/ListMessagePage/MessageInfoModal/ChatsChips';

test("Chat chips render correctly", () => {
  const testData = ["Chat name 1", "Chat name 2", "Another chat name..."];

  const component = renderer.create(<ChatsChips chats={testData}/>).toJSON();
  expect(component).toMatchSnapshot();
});
