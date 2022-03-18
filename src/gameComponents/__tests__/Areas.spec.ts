import { shallowMount, Wrapper } from '@vue/test-utils'
import { EDirection } from '@/types'
import Areas from '@/gameComponents/Areas.vue'
import mock = jest.mock;

const baseMocks = {
  $store: {
    state: {
      scoreStore: {
        score: 0,
        lastStyle: ''
      }
    }
  }
}

describe('Arrow.vue', () => {
  let wrapper: Wrapper<Areas>
  let vm: Areas|any

  beforeEach(() => {
    wrapper = shallowMount(Areas, {
      mocks: baseMocks
    })
    vm = wrapper.vm
    /*    vm.animationStyle = {
      good: '',
      excellent: 'excellent'
    }
    vm.$options.watch.$store.state.arrowStore.call(vm.animationStyle, {
      good: '',
      excellent: 'excellent'
    }) */
  })

  /*  it('should =div= exists', () => {
    expect(wrapper.find('div').exists()).toBe(true)
  }) */

  /*  it('test watcher', () => {
    // let myStore = vm.$store.state.arrowStore
    vm.$options.watch.$store.state.scoreStore.call(vm, {
      score: 12,
      lastStyle: 'excellent'
    })
    expect(vm.animationStyle).toBe({
      good: '',
      excellent: 'excellent'
    })
  }) */

  it('test watcher', async () => {
    // let myStore = vm.$store.state.arrowStore
    wrapper.setData({
      $store: {
        state: {
          scoreStore: {
            score: 12,
            lastStyle: 'excellent'
          }
        }
      }
    })
    // vm.$store.state.scoreStore.lastStyle = 'excellent'
    await vm.$nextTick()
    expect(vm.animationStyle).toBe({
      good: '',
      excellent: 'excellent'
    })
  })
})
