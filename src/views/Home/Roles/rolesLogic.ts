import { reactive } from '@vue/reactivity';

type Roles = {
  id: number;
  roleName: string;
  roleDesc: string;
  children: [
    {
      id: number;
      authName: string;
      path: null;
      children: [
        {
          id: number;
          authName: string;
          path: null;
          children: [
            {
              id: number;
              authName: string;
              path: null;
            }
          ];
        }
      ];
    }
  ];
};

export type State = {
  rolesList: Roles[];
};

type rolesLogic = {
  state: State;
};

const rolesLogic = (): rolesLogic => {
  const state: State = reactive({
    rolesList: [],
  });

  return {
    state,
  };
};

export default rolesLogic;
