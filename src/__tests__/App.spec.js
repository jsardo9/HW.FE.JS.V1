import { mount } from '@vue/test-utils'
import { vi, describe, it, expect } from 'vitest';
import App from 'src/App.vue'
import TheTable from '@/components/TheTable.vue'
import { getPeople } from '@/services/PeopleService'

// Mocking the getPeople function
vi.mock('@/services/PeopleService', () => ({
    getPeople: vi.fn()
}))

describe('App.vue', () => {
    it('fetches and displays dataEntries correctly', async () => {
        // Mocking the data from the API
        const mockData = [{
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "dob": "1980-01-10",
            "skills": ["JavaScript", "React"],
            "addressStreet": "1 Main Street",
            "addressCity": "New York",
            "addressRegion": "NY",
            "addressPostal": "10001",
            "addressCountry": "USA"
        }
        ]
        getPeople.mockResolvedValue(mockData)

        const wrapper = mount(App)

        // Wait for the dataEntries to be populated
        await wrapper.vm.$nextTick()

        // Ensure that the TheTable component is rendered
        const tableComponent = wrapper.findComponent(TheTable)
        expect(tableComponent.exists()).toBeTruthy()

        // Ensure that the table component receives the correct props
        expect(tableComponent.props('title')).toBe(wrapper.vm.gridLayout.title)
        expect(tableComponent.props('description')).toBe(wrapper.vm.gridLayout.description)
        expect(tableComponent.props('columnDefs')).toBe(wrapper.vm.gridLayout.columnDefs)
        expect(tableComponent.props('data')).toBe(wrapper.vm.dataEntries)
    })
})
