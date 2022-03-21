import { shallowMount, Wrapper } from '@vue/test-utils'
import Areas from '@/gameComponents/Areas.vue'
import Vue from 'vue'

const baseMocks = {
  $store: {
    state: {
      scoreStore: {
        score: 0,
        lastStyle: 'excellent'
      },
      arrowStore: {
        arrowsData:
          [{
            id: 1,
            direction: 'left-arrow'
          }]
      }
    }
  }
}

let wrapper: Wrapper<Areas>
let vm: Areas | any

describe('Areas.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Areas, {
      mocks: baseMocks
    })
    vm = wrapper.vm
  })

  it('test animationStyle', async () => {
    expect(vm.animationStyle).toEqual({
      good: '',
      excellent: 'excellent-animation'
    })
  })
})

describe('Areas.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(Areas, {
      mocks: baseMocks
    })
    vm = wrapper.vm
    wrapper.setData({
      $store: {
        state: {
          scoreStore: {
            score: 0,
            lastStyle: 'good'
          }
        }
      }
    })
  })

  it('should update necessary style', async () => {
    await Vue.nextTick()
    expect(vm.animationStyle).toEqual({
      good: 'good-animation',
      excellent: 'excellent-animation'
    })
  })

  it('should find necessary style', function () {
    expect(wrapper.find('#good').classes()).toContain('good-animation')
  })

  jest.useFakeTimers()
  it('should reset style after timeout', function () {
    jest.advanceTimersByTime(200)

    expect(vm.animationStyle).toEqual({
      good: '',
      excellent: ''
    })
  })
})
