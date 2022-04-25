import { ResumeSchema } from '~/types'
import { getCountryName } from '~/util'

import { Link } from './Link'

type Props = {
    className?: string
} & Pick<NonNullable<ResumeSchema['basics']>, 'phone' | 'email' | 'location'>

export const Contact = ({ location, phone, email, className }: Props) => {
    // todo: configurable location format
    let locationText
    if (location?.city && (location?.countryCode || location?.region)) {
        locationText = [
            location.city,
            location.countryCode
                ? getCountryName(location.countryCode, 'alias')
                : location.region,
        ].join(', ')
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
