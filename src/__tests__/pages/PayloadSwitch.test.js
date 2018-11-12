import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PayloadSwitch from '../../pages/Main/ListMessagePage/MessageInfoModal/PayloadSwitch';

Enzyme.configure({ adapter: new Adapter() });

describe("Test PayloadSwitch rendering...", () => {
  test("payload type = file", () => {
    const component = Enzyme.shallow(
      <PayloadSwitch payload_type="file" payload={undefined}/>
    );
    expect(component).toMatchSnapshot();
  });

  test("payload type = sticker, without actual payload", () => {
    const component = Enzyme.shallow(
      <PayloadSwitch payload_type="sticker" payload={undefined}/>
    );
    expect(component).toMatchSnapshot();
  });

  test("payload type = message, without actual payload", () => {
    const component = Enzyme.shallow(
      <PayloadSwitch payload_type="message" payload={undefined}/>
  );
    expect(component).toMatchSnapshot();
  });

  test("payload type = sticker, with payload", () => {
    const component = Enzyme.shallow(
      <PayloadSwitch payload_type="sticker" payload="base64_encoded_image"/>
    );
    expect(component).toMatchSnapshot();
  });

  test("payload type = message, with payload", () => {
    const component = Enzyme.shallow(
      <PayloadSwitch payload_type="message" payload="I'm a message!!!"/>
    );
    expect(component).toMatchSnapshot();
  });
});
