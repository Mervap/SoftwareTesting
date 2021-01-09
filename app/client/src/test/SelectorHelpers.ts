import {ReactWrapper} from "enzyme";

export function changeInput(wrapper: ReactWrapper, selector: string, value: string) {
  wrapper.find(selector).filter("input").simulate('change', {target: {value: value}});
}

export function findButton(wrapper: ReactWrapper, selector: string): ReactWrapper<any, any> {
  return wrapper.find(selector).filter("button")
}

export function findInput(wrapper: ReactWrapper, selector: string): ReactWrapper<any, any> {
  return wrapper.find(selector).filter("input")
}
