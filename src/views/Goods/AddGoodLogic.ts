import { computed, WritableComputedRef } from 'vue';
import { reactive } from 'vue-demi';
import { CheckPhone, checkNumber } from '@/hook/common/formValidate';
import type { CateRes } from '@/views/Category/CategoryLogic';

import addGoodsRequest from './addGoodsRequest';

type addGoodlogic = {
  state: State;
  tabsIndex: WritableComputedRef<string>;
  cascadChange: () => void;
  tabClick: () => void;
};

type attr = {
  attr_id: number;
  attr_name: string;
  cat_id: number;
  attr_sel: string;
  attr_write: string;
  attr_vals: string;
  attrVals: string[];
};

type addForm = {
  goods_name: string;
  goods_cat: string;
  goods_price: number;
  goods_number: number;
  goods_weight: number;
  goods_introduce: string;
  goods_cate: number[];
  pics: [{ pic: string }];
  attrs: [
    {
      attr_id: number;
      attr_value: string;
    },
    {
      attr_id: number;
      attr_value: string;
    }
  ];
};

export type State = {
  activeIndex: number;
  addGoodSteps: {
    id: number;
    title: string;
  }[];
  // 添加商品的表单对象
  addForm: addForm;
  // 添加商品的表单验证
  addFormRules: {
    goods_name: [
      { required: true; message: '请输入商品名称'; trigger: 'blur' }
    ];
    goods_price: [{ required: true; validator: CheckPhone; trigger: 'change' }];
    goods_weight: [
      { required: true; validator: CheckPhone; trigger: 'change' }
    ];
    goods_number: [
      { required: true; validator: CheckPhone; trigger: 'change' }
    ];
    goods_cat: [{ required: true; message: '请选择商品分类'; trigger: 'blur' }];
  };
  // 添加商品表单的 ref
  addFormRef: unknown;
  cateList: CateRes[];
  cateProps: {
    expandTrigger: 'hover';
    label: 'cat_name';
    value: 'cat_id';
    children: 'children';
  };
  manyTableData: attr[];
  onlyTableData: attr[];
};

const addGoodlogic = (): addGoodlogic => {
  const state: State = reactive({
    activeIndex: 0,
    // 添加商品步骤
    addGoodSteps: [
      { id: 0, title: '基本信息' },
      { id: 1, title: '商品参数' },
      { id: 2, title: '商品属性' },
      { id: 3, title: '商品图片' },
      { id: 4, title: '商品内容' },
      { id: 5, title: '完成' },
    ],
    // 添加商品的表单对象
    addForm: {
      goods_name: '',
      goods_cat: '',
      goods_price: 0,
      goods_number: 0,
      goods_weight: 0,
      goods_introduce: '',
      // 商品分类数组
      goods_cate: [],
      pics: [{ pic: '' }],
      attrs: [
        {
          attr_id: 0,
          attr_value: '',
        },
        {
          attr_id: 0,
          attr_value: '',
        },
      ],
    },
    // 添加商品的表单验证
    addFormRules: {
      goods_name: [
        { required: true, message: '请输入商品名称', trigger: 'blur' },
      ],
      goods_price: [
        { required: true, validator: checkNumber, trigger: 'change' },
      ],
      goods_weight: [
        { required: true, validator: checkNumber, trigger: 'change' },
      ],
      goods_number: [
        { required: true, validator: checkNumber, trigger: 'change' },
      ],
      goods_cat: [
        { required: true, message: '请选择商品分类', trigger: 'blur' },
      ],
    },
    // 添加商品表单的 ref
    addFormRef: null,
    // 分类列表
    cateList: [],
    // cascader 配置
    cateProps: {
      expandTrigger: 'hover',
      label: 'cat_name',
      value: 'cat_id',
      children: 'children',
    },
    // 获取的商品参数
    manyTableData: [],
    // 获取的商品属性
    onlyTableData: [],
  });

  // 类型转换 tabs v-model 只接收 string
  const tabsIndex = computed<string>({
    get() {
      return state.activeIndex.toString();
    },
    set(value) {
      return (state.activeIndex = Number(value));
    },
  });

  // cascader 选中函数
  const cascadChange = () => {
    const len = state.addForm.goods_cate.length;
    if (len !== 3) state.addForm.goods_cate = [];
  };

  // request
  const { toGetGoodsCate, toGetAttr } = addGoodsRequest(state);
  toGetGoodsCate();

  // 点击 tabs 回调
  const tabClick = async () => {
    const len = state.addForm.goods_cate.length;
    const catId = state.addForm.goods_cate[len - 1];
    switch (state.activeIndex) {
      // 商品参数请求
      case 1: {
        await toGetAttr(catId, 'many');
        state.manyTableData.map(
          (item) =>
            (item.attrVals = item.attr_vals.length
              ? item.attr_vals.split(',')
              : [])
        );
        break;
      }
      // 商品属性参数
      case 2: {
        await toGetAttr(catId, 'only');
        state.onlyTableData.map(
          (item) =>
            (item.attrVals = item.attr_vals.length
              ? item.attr_vals.split(',')
              : [])
        );
        break;
      }
    }
  };

  return {
    state,
    tabsIndex,
    cascadChange,
    tabClick,
  };
};

export default addGoodlogic;
