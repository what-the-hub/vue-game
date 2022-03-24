import { shallowMount, Wrapper } from '@vue/test-utils'
import Areas from '@/gameComponents/Areas.vue'

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

  it('animationStyle must consist necessary style', () => {
    expect(vm.animationStyle).toEqual({
      good: '',
      excellent: 'excellent-animation'
    })
  })

  it('emit should exist and return necessary obj', async () => {
    // vm.$emit('calculate-positions')
    // await Vue.nextTick()
    // expect(wrapper.emitted('calculate-positions')).toHaveLength(1)
    expect(wrapper.emitted('calculate-positions')).toMatchObject([
      [{
        bottomExcellentArea: 0,
        bottomGoodArea: 0,
        topExcellentArea: 0,
        topGoodArea: 0
      }]
    ])
  })

  describe('Areas.vue styles', () => {
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

    it('should update necessary style', () => {
      expect(vm.animationStyle).toMatchObject({
        good: 'good-animation',
        excellent: 'excellent-animation'
      })
    })

    it('should find necessary style', function () {
      expect(wrapper.find('#good').classes()).toContain('good-animation')
    })

    it('should not find necessary style', function () {
      expect(wrapper.find('#excellent').classes()).not.toContain('good-animation')
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
})
