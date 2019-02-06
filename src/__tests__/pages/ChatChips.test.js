import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ChatsChips from '../../pages/Main/ListMessagePage/MessageInfoModal/ChatsChips';

Enzyme.configure({ adapter: new Adapter() });

test("Chat chips render correctly", () => {
  const testData = ["Chat name 1", "Chat name 2", "Another chat name..."];

  const component = Enzyme.shallow(<ChatsChips chats={testData}/>);
  expect(component).toMatchSnapshot();
});
