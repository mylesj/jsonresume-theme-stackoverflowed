import { dateFormat } from './date'

describe(dateFormat.name, () => {
    beforeEach(() => {
        jest.setSystemTime(new Date('1971-03-04').getTime() / 1000)
    })

    const expectedWithSystemTime /* 1971-03-04 */ = {
        durationISO: 'P1Y2M3DT0H0M0S',
        startDateISO: '1970-01-01T00:00:00Z',
        endDateISO: '1971-03-04T00:00:00Z',
        startDate: 'Jan 1970',
        endDate: 'Mar 1971',
    }

    const expectedWithEndTime /* 2000-01-01 */ = {
        durationISO: 'P30Y0M0DT0H0M0S',
        startDateISO: '1970-01-01T00:00:00Z',
        endDateISO: '2000-01-01T00:00:00Z',
        startDate: 'Jan 1970',
        endDate: 'Jan 2000',
    }

    describe('allowed input', () => {
        it.each`
            case                              | startDate    | endDate      | expected
            ${'ignore invalid start dates'}   | ${'INVALID'} | ${undefined} | ${null}
            ${'ignore invalid end dates'}     | ${'1970-01'} | ${'INVALID'} | ${null}
            ${'ignore undefined start dates'} | ${undefined} | ${'1970-01'} | ${null}
            ${'allow undefined end dates'}    | ${'1970-01'} | ${undefined} | ${expect.any(Object)}
        `('should $case', ({ startDate, endDate, expected }) => {
            const result = dateFormat({ startDate, endDate })
            expect(result).toEqual(expected)
        })
    })

    describe('start date format validity', () => {
        it.each`
            case                                | date
            ${'a partial year'}                 | ${'1970'}
            ${'a partial year-month'}           | ${'1970-01'}
            ${'a year-month-date'}              | ${'1970-01-01'}
            ${'an ISO date and time with zone'} | ${'1970-01-01T00:00:00+00:00'}
            ${'a UTC / Zulu ISO date and time'} | ${'1970-01-01T00:00:00Z'}
        `('should allow $case', ({ date: startDate }) => {
            const result = dateFormat({ startDate })
            expect(result).toEqual(expectedWithSystemTime)
        })
    })

    describe('end date format validity', () => {
        it.each`
            case                                | date
            ${'a partial year'}                 | ${'2000'}
            ${'a partial year-month'}           | ${'2000-01'}
            ${'a year-month-date'}              | ${'2000-01-01'}
            ${'an ISO date and time with zone'} | ${'2000-01-01T00:00:00+00:00'}
            ${'a UTC / Zulu ISO date and time'} | ${'2000-01-01T00:00:00Z'}
        `('should allow $case', ({ date: endDate }) => {
            const result = dateFormat({ startDate: '1970-01-01', endDate })
            expect(result).toEqual(expectedWithEndTime)
        })
    })
})
