import { reactive } from '@vue/reactivity';

type Rights = {
  id: number;
  authName: string;
  level: number;
  pid: number;
  path: string;
};
export type State = {
  rightsList: Rights[];
};
type rightsLogic = {
  state: State;
};

const rightsLogic = (): rightsLogic => {
  const state: State = reactive({
    rightsList: [],
  });

  return {
    state,
  };
};

export default rightsLogic;
