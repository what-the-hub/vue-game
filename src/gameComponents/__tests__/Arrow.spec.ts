import { shallowMount, Wrapper } from '@vue/test-utils'

import Arrow from '@/gameComponents/Arrow.vue'
import { EGetterArrow } from '@/store/modules/arrow/typesArrow'

import { StoreModuleEnum } from '@/store/types'
import { BIcon } from 'bootstrap-vue'
import { EDirection } from '@/types'

// eslint-disable-next-line camelcase
const baseMocks = {
  $store: {
    getters: {
      [`${StoreModuleEnum.arrowStore}/${EGetterArrow.GET_LAST_ITEM}`]: { id: 1, direction: EDirection.ArrowDown }
    },
    dispatch: () => jest.fn()
  }
}

describe('Arrow.vue', () => {
  let wrapper: Wrapper<Arrow>
  let vm: Arrow|any
  const deleteLastArrow = jest.fn()

  beforeEach(() => {
    wrapper = shallowMount(Arrow, {
      mocks: baseMocks,
      components: {
        'b-icon': BIcon
      },
      methods: { deleteLastArrow }
    })
    vm = wrapper.vm
  })

  it('check =p= exists', () => {
    expect(wrapper.find('p').exists()).toBe(true)
  })

  it('should set arrowData from the store', () => {
    expect(vm.arrowData.direction).toEqual(EDirection.ArrowDown)
    expect(vm.arrowData.id).toEqual(1)
  })

  it('should set icon Name', () => {
    expect(vm.iconName).toEqual('arrow-down-square')
  })

  it('should call dispatch on deleteLastArrow', () => {
    vm.deleteLastArrow()
    setTimeout(() => {
      expect(vm.$store.dispatch).toHaveBeenCalled()
    }, 0)
  })

  it('should return last arrow data', () => {
    expect(vm.getLastArrow()).toEqual({ id: 1, direction: EDirection.ArrowDown })
  })

  it('should  call deleteLastArrow after animationend event', () => {
    wrapper.trigger('animationend')
    expect(deleteLastArrow).toHaveBeenCalled()
  })
})
