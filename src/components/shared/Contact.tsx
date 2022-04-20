import { Resume, WithEmotionCss, MaybeInternalProps } from '~/types'
import { getCountryName } from '~/util'

import { Link } from './Link'

type Props = Pick<NonNullable<Resume['basics']>, 'phone' | 'email'> & {
    location?: NonNullable<Resume['basics']>['location']
}

export const Contact = ({
    location,
    phone,
    email,
    ...rest
}: WithEmotionCss<Props>) => {
    const { className } = rest as MaybeInternalProps

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
