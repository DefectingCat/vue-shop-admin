import type { State } from './GoodsLogic';
import { useRouter } from 'vue-router';

const addGoods = (state: State) => {
  const router = useRouter();

  const openAddUserDialog = async () => {
    router.push('/goods/add');
  };

  return {
    openAddUserDialog,
  };
};

export default addGoods;
