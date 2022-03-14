import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Arrow from '@/gameComponents/Arrow.vue'
import {EGetterArrow, IStateArrow} from '@/store/modules/arrow/typesArrow'
import { getDirection } from '@/helpers/getDirectionHelper'
import {StoreModuleEnum} from "@/store/types";

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Arrow.vue', () => {
  let state: IStateArrow
  const getters: any = {

  }
  const actions: any = {
    deleteLastArrow: jest.fn()
  }
  let store: any
  const arrowData = {
    id: Date.now(),
    direction: getDirection()
  }
  beforeEach(() => {
    state = {
      arrowsData: [arrowData]
    }
    store = new Vuex.Store({
      modules: {
        arrowStore: {
          namespaced: true,
          state,
          getters,
          actions
        }
      }
    })
  })

  const wrapper = shallowMount(Arrow, { store, localVue })

  it('check =p= exists', () => {
    expect(wrapper.find('p').exists()).toBe(true)
  })
})
