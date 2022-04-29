import { ResumeSchema } from '~/types'
import { interpolate, asArray } from '~/util'
import { useConfig, useLocale } from '~/context'

import { Link } from './Link'

const DEFAULT_LOCATION_FORMATS = [
    '{{city}}, {{region}}',
    '{{city}}, {{countryNameAlias}}',
    '{{city}}, {{countryNameOfficial}}',
    '{{city}}, {{countryCode}}',
    '{{city}}',
]

type Props = {
    className?: string
} & Pick<NonNullable<ResumeSchema['basics']>, 'phone' | 'email' | 'location'>

export const Contact = ({ location, phone, email, className }: Props) => {
    const configLocationFormat = useConfig('format')?.location ?? []
    const formats = asArray(configLocationFormat).concat(
        ...DEFAULT_LOCATION_FORMATS
    )
    const countryName = useLocale('countryName')

    const enhancedLocation = {
        ...location,
        ...countryName(location?.countryCode),
    }

    let locationText
    while (formats.length && !locationText) {
        locationText = interpolate(formats.shift(), enhancedLocation)
    }

    return (
        <address className={className} css={{ textAlign: 'right' }}>
            {locationText && <div>{locationText}</div>}
            {phone && <Link type="tel" to={phone} css={{ display: 'block' }} />}
            {email && (
                <Link type="mail" to={email} css={{ display: 'block' }} />
            )}
        </address>
    )
}
