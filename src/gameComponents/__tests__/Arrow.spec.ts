import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Arrow from '../../gameComponents/Arrow'
import { arrowStore } from '@/store/modules/arrow/arrow'
import { IStateArrow } from '@/store/modules/arrow/typesArrow'
import { getDirection } from '@/helpers/getDirectionHelper'

const localVue = createLocalVue()

// jest.mock()

localVue.use(Vuex)

describe('Arrow.vue', () => {
  let state: IStateArrow
  let actions: any
  let store: any
  const arrowData = {
    id: Date.now(),
    direction: getDirection()
  }
  beforeEach(() => {
    state = {
      arrowsData: [arrowData]
    }

    actions = {
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

  const wrapper = shallowMount(Arrow, { store, localVue })

  it('check =p= exists', () => {
    expect(wrapper.contains('p')).toBe(true)
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
