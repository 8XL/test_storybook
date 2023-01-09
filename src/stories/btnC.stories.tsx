import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { BtnC } from "./btnC";
import { BtnVM, BtnVMCtorProps } from "./btnVM";

// BtnVMCtorProps просто для типизации в альтернативу Partial/Pick<BtnVM, ...>
type WrapperProps = BtnVMCtorProps & { border?: boolean };

// обдумкать хелпер, который будет сводить пропсы из истории
// во вьюмодель. С простыми примитивами всё просто,
// контейнеры обобщить в какой-нибудь ContainerBase
// с дефолтными методами add, has, remove, чтобы сделать
// обобщенную работу с ними в сведении. 
// Зачем: например пишем тест-кейс с textField из реворка. 
// в аргс передаем boolean контрола. В обертке шаблона const Template
// если булин - объявляем объект класса вьюмодели кнопки и передаем
// в StoryWrapper пропсом preffixButton. 

// export class TextFieldViewModel extends InitializableViewModelBase {
//   constructor(props: TextFieldViewModelCtorProps) {
//   ...
//   this.prefixButtons = new Collection();
//   ...
// }
const storyPropsHelper = (props: Record<string, any>, vm: any) => {
  // к вопросу о додумкать:
  // на примере с кнопкой и текстфилдом проверять (напр. instanceOf)
  // ключ пропса во вьюмодели на принадлежность к ContainerBase
  // тем самым вызвав соответствующий метод для добавления/удаления кнопки
  for (let key in props) {
    if (key in vm && props[key] !== vm[key]) {
      vm[key] = props[key];
    }
  }
};

// type StoryWrapperHOC = <P = unknown, T = unknown>(
//   props: P,
//   vm: T
// ) => JSX.Element;

// const StoryWrapper: StoryWrapperHOC = (a, vm) => {
//   console.log(a, vm);
//   return React.createElement("div", undefined, <div>test</div>);
// };

const StoryWrapper: React.FC<WrapperProps> = (props, viewModel) => {
  const vm = React.useMemo(() => {
    storyPropsHelper(props, viewModel);

    return viewModel;
  }, [props, viewModel]);
  // тут допустим DynamicComponent
  return <BtnC viewModel={vm} />;
};

export default {
  title: "Test/Button MVVM",
  component: StoryWrapper,
  // в параметры передаём конкретную модель объявленной
  // чтобы не переобъявлять на каждый рендер в истории
  parameters: {
    viewModel: new BtnVM({ label: "asd" }),
  },
  argTypes: {
    backgroundColor: { control: "color" },
    size: {
      description: "Какое-то описание",
      type: { name: "string", required: true },
      label: "Какой-то лэйбл",
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
  },
  args: {
    primary: false,
    backgroundColor: "#57bd80",
    size: "large",
    label: "Test",
    border: false,
  },
} as ComponentMeta<typeof StoryWrapper>;

const Template: ComponentStory<typeof StoryWrapper> = (
  args: BtnVMCtorProps,
  opts
) => {
  return <>{StoryWrapper(args, opts.parameters.viewModel)}</>;
};

export const Test = Template.bind({});
Test.args = {
  primary: true,
  label: "Ya kaldun",
};
