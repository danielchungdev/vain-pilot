import { mount } from '@vue/test-utils'
import HelloWorld from '@/App.vue'
import AddBook from '@/views/AddBookForm.vue'

describe('App.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'ByLast'
    const wrapper = mount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

describe('AddBookForm.vue', () => {
  const wrapper = mount(AddBook);
  test('does Axios get',()=>{
  jest.mock("axios", () => ({
    get: () => Promise.resolve({ data: [{ val: 1 }] })
  }))
})
it("mocking the axios.get call to get bookTypeCount", () => {
  wrapper.vm.$nextTick(() => {
  expect(wrapper.vm.bookTypeCount.length).toBe(1);
  })
})
  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })

    // it's also easy to check for the existence of elements
  it('has a button', () => {
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renders correctly with different data', async () => {
    wrapper.setData({ x1: 5, x2: 10 })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Add a New Book')
  })

})
