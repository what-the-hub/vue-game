import { shallowMount, Wrapper } from '@vue/test-utils'
import Arrow from '@/gameComponents/Arrow.vue'
import { EActionArrow, EGetterArrow } from '@/store/modules/arrow/typesArrow'
import { StoreModuleEnum } from '@/store/types'
import { BIcon } from 'bootstrap-vue'
import { EDirection } from '@/types'

const baseMocks = {
  $store: {
    getters: {
      [`${StoreModuleEnum.arrowStore}/${EGetterArrow.GET_LAST_ITEM}`]: { id: 1, direction: EDirection.ArrowDown }
    },
    dispatch: jest.fn()
  }
}

describe('Arrow.vue', () => {
  let wrapper: Wrapper<Arrow>
  let vm: Arrow|any

  beforeEach(() => {
    wrapper = shallowMount(Arrow, {
      mocks: baseMocks,
      components: {
        'b-icon': BIcon
      }
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
    expect(vm.$store.dispatch)
      .toHaveBeenCalledWith(
        `${StoreModuleEnum.arrowStore}/${EActionArrow.DELETE_ARROW}`
      )
  })

  it('should return last arrow data', () => {
    expect(vm.getLastArrow()).toEqual({
      id: 1,
      direction: EDirection.ArrowDown
    })
  })

  it('should  call deleteLastArrow after animationend event', () => {
    vm.deleteLastArrow = jest.fn()
    wrapper.trigger('animationend')
    expect(vm.deleteLastArrow).toHaveBeenCalled()
  })

  it('should destroy after animationend event', () => {
    vm.$destroy = jest.fn()
    wrapper.trigger('animationend')
    expect(vm.$destroy).toHaveBeenCalled()
  })

  it('=p= should have necessary class', () => {
    expect(wrapper.find('p').classes()).toContain('default-arrow')
  })
})
