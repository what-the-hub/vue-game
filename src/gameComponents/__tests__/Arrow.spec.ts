import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Arrow from '@/gameComponents/Arrow.vue'
import { arrowStore } from '@/store/modules/arrow/arrow'
import {Actions, EActionArrow, IStateArrow} from "@/store/modules/arrow/typesArrow";
import {RootStateInterface} from "@/store/types";

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Arrow.vue', () => {
  let state: IStateArrow
  let actions: any
  let store: any
  beforeEach(() => {
    state = {
      arrowsData: []
    }

    const actions = {
      getLastArrow: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        arrowStore: {
          state,
          actions,
          getters: arrowStore.getters,
          namespaced: true
        }
      }
    })
  })

  it('calls store action "moduleActionClick" when button is clicked', () => {
    const wrapper = shallowMount(Arrow, { store, localVue })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(actions.getLastArrow).toHaveBeenCalled()
  })

  it('renders "state.clicks" in first p tag', () => {
    const wrapper = shallowMount(MyComponent, { store, localVue })
    const p = wrapper.find('p')
    expect(p.text()).toBe(state.clicks.toString())
  })
})

/* jest.mock('@/store/modules/arrow/arrow', () => ({
  service: {
    // jest.fn creates mock function which replaces actually implementation of function.
    // It captures all calls to function with arguments and more.
    createProduct: jest.fn(() => async (p: Product) => {
    }),
    getEmpty: () => {
      return {};
    },
  },
})) */
