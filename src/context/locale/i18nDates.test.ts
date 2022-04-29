import { dateFormatterFactory } from './i18nDates'

describe(dateFormatterFactory.name, () => {
    it('should return date formatter thunks', async () => {
        const { formatDate, formatDateRange } = await dateFormatterFactory(
            'en-US'
        )
        expect(formatDate).toEqual(expect.any(Function))
        expect(formatDateRange).toEqual(expect.any(Function))
    })
})

describe('formatDate', () => {
    let formatter: Awaited<
        ReturnType<typeof dateFormatterFactory>
    >['formatDate']
    beforeEach(async () => {
        jest.setSystemTime(new Date('1971-03-04').getTime() / 1000)
        formatter = (await dateFormatterFactory('en-US')).formatDate
    })

    describe('allowed input', () => {
        it.each`
            case                      | date         | expected
            ${'ignore invalid dates'} | ${'INVALID'} | ${null}
            ${'allow valid dates'}    | ${'1970-01'} | ${expect.any(Object)}
        `('should $case', ({ date, expected }) => {
            const result = formatter(date)
            expect(result).toEqual(expected)
        })
    })

    describe('date validity', () => {
        it.each`
            case                                | date
            ${'a partial year'}                 | ${'1970'}
            ${'a partial year-month'}           | ${'1970-01'}
            ${'a year-month-date'}              | ${'1970-01-01'}
            ${'an ISO date and time with zone'} | ${'1970-01-01T00:00:00+00:00'}
            ${'a UTC / Zulu ISO date and time'} | ${'1970-01-01T00:00:00Z'}
        `('should allow $case', ({ date }) => {
            const result = formatter(date)
            expect(result).toEqual({
                dateISO: '1970-01-01T00:00:00Z',
                date: 'Jan 1970',
            })
        })
    })

    describe('formatting', () => {
        it('should optionally accept a "format" parameter', () => {
            const result = formatter('1970-01-01', 'MM/dd/yyyy')
            expect(result?.date).toBe('01/01/1970')
        })
    })

    describe('locale support', () => {
        let formatterFr: Awaited<
            ReturnType<typeof dateFormatterFactory>
        >['formatDate']
        beforeEach(async () => {
            formatterFr = (await dateFormatterFactory('fr')).formatDate
        })

        it('should format single dates', () => {
            const result = formatterFr('1970')
            expect(result).toEqual({
                dateISO: '1970-01-01T00:00:00Z',
                date: 'janv. 1970',
            })
        })
    })
})

describe('formatDateRange', () => {
    let formatter: Awaited<
        ReturnType<typeof dateFormatterFactory>
    >['formatDateRange']
    beforeEach(async () => {
        jest.setSystemTime(new Date('1971-03-04').getTime() / 1000)
        formatter = (await dateFormatterFactory('en-US')).formatDateRange
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
            const result = formatter({ startDate, endDate })
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
            const result = formatter({ startDate })
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
            const result = formatter({ startDate: '1970-01-01', endDate })
            expect(result).toEqual(expectedWithEndTime)
        })
    })

    describe('formatting', () => {
        it('should optionally accept a "format" parameter', () => {
            const result = formatter({
                startDate: '1970-01-01',
                format: 'MM/dd/yyyy',
            })
            expect(result?.startDate).toBe('01/01/1970')
        })
    })

    describe('locale support', () => {
        let formatterFr: Awaited<
            ReturnType<typeof dateFormatterFactory>
        >['formatDateRange']
        beforeEach(async () => {
            formatterFr = (await dateFormatterFactory('fr')).formatDateRange
        })

        it('should format single dates', () => {
            const result = formatterFr({ startDate: '1970', endDate: '2000' })
            expect(result).toEqual({
                ...expectedWithEndTime,
                startDate: 'janv. 1970',
                endDate: 'janv. 2000',
            })
        })
    })
})
