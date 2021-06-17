import type { State } from './GoodsLogic';
import { useRouter } from 'vue-router';

type addGoods = {
  openAddUserDialog: () => Promise<void>;
};

const addGoods = (state: State): addGoods => {
  const router = useRouter();

  const openAddUserDialog = async () => {
    router.push('/goods/add');
  };

  return {
    openAddUserDialog,
  };
};

export default addGoods;
