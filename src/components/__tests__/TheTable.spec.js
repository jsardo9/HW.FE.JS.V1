import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TheTable from '../TheTable.vue'

describe('title', () => {
    it('renders properly', () => {
        const wrapper = mount(TheTable, { props: { title: 'Test Title' } })
        expect(wrapper.text()).toContain('Test Title');
    })
})

describe('description', () => {
    it('renders properly', () => {
        const wrapper = mount(TheTable, { props: { description: 'Test Description' } })
        expect(wrapper.text()).toContain('Test Description');
    })
})

describe('table header', () => {
    it('renders properly', () => {
        const columnDefs = [{ "name": "Name" }, { "name": "DOB" }, { "name": "Skills" }, { "name": "Address" }]
        const wrapper = mount(TheTable, { props: { columnDefs: columnDefs } });

        const tableHeader = wrapper.findAll('th');
        expect(tableHeader.length).toBe(4);
        expect(wrapper.text()).toContain('Name');
        expect(wrapper.text()).toContain('DOB');
        expect(wrapper.text()).toContain('Skills');
        expect(wrapper.text()).toContain('Address');
    })
})
