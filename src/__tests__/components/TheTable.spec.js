import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TheTable from 'src/components/TheTable.vue'

describe('table', () => {
  it('renders title properly', () => {
    const wrapper = mount(TheTable, { props: { title: 'Test Title', columnDefs: [], styling: {} } })
    expect(wrapper.text()).toContain('Test Title')
  })

  it('renders description properly', () => {
    const wrapper = mount(TheTable, {
      props: { description: 'Test Description', columnDefs: [], styling: {} }
    })
    expect(wrapper.text()).toContain('Test Description')
  })

  it('renders header properly', () => {
    const columnDefs = [{ name: 'Name' }, { name: 'DOB' }, { name: 'Skills' }, { name: 'Address' }]
    const wrapper = mount(TheTable, { props: { columnDefs: columnDefs, styling: {} } })

    const tableHeader = wrapper.findAll('th')
    expect(tableHeader.length).toBe(4)
    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('DOB')
    expect(wrapper.text()).toContain('Skills')
    expect(wrapper.text()).toContain('Address')
  })

  it('renders styles properly', () => {
    const columnDefs = [{ name: 'Name' }, { name: 'DOB' }, { name: 'Skills' }, { name: 'Address' }]
    const styling = {
      'background-color': 'Beige',
      'text-color': 'Blue'
    }
    const wrapper = mount(TheTable, { props: { columnDefs: columnDefs, styling: styling } })

    // Checking for correct header styling
    const tableHeader = wrapper.find('thead')
    expect(tableHeader.attributes().style).toContain('background-color: Beige')
    expect(tableHeader.attributes().style).toContain('color: Blue')

    // Checking for correct body styling
    const tableBody = wrapper.find('tbody')
    expect(tableBody.attributes().style).toContain('background-color: Beige')
    expect(tableBody.attributes().style).toContain('color: Blue')
  })

  it('renders loading icon properly', () => {
    const columnDefs = [{ name: 'Name' }, { name: 'DOB' }, { name: 'Skills' }, { name: 'Address' }]
    const wrapper = mount(TheTable, { props: { columnDefs: columnDefs } })

    // Checking for loading icon element
    const loadingIcon = wrapper.find('tbody').find('img')
    expect(loadingIcon.attributes().src).toBe('/src/assets/loading.gif')
  })
})
