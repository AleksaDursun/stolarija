import {Injectable} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {ConstService} from './const.service';
import {NavigationEnd, Router} from '@angular/router';
import {StripSpecialCharsPipe} from '../pipes/strip-special-chars.pipe';
import {formatDate} from '@angular/common';
import {environment} from '../../../../environments/environment';
import {TitleService} from './title.service';

@Injectable({
    providedIn: 'root'
})
export class SchemaService {

    constructor(
        private metaService: Meta,
        private router: Router,
        private titleService: TitleService
    ) {
    }

    public setProductBreadcrumbList(category, product) {
        const url = environment.FRONTEND_URL;
        return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            name: product.name + ' - Umjetnost u Drvetu',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    item: {name: 'Umjetnost u Drvetu', '@id': url}
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    item: {name: category, '@id': url + '/pocetna/proizvodi/' + encodeURI(category)}
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    item: {name: product.name, '@id': environment.FRONTEND_URL + this.router.url}
                }
            ]
        };
    }

    public setCategoryBreadcrumbList(category) {
        const url = environment.FRONTEND_URL;
        return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            name: category + ' - Umjetnost u Drvetu',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    item: {name: 'Umjetnost u Drvetu', '@id': url}
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    item: {name: category, '@id': url + '/pocetna/proizvodi/' + encodeURI(category)}
                },
            ]
        };
    }


    setProductMetaData(product) {
        const stock = this.isInStock(product.quantity > 0);
        const url = environment.FRONTEND_URL;
        const locationHref = environment.FRONTEND_URL + this.router.url;
        return {
            '@context': 'https://schema.org',
            name: product.name + ' - Umjetnost u Drvetu',
            '@graph': [{
                '@type': 'Organization',
                '@id': url + '#organization',
                name: 'Umjetnost u Drvetu',
                url,
                sameAs: [],
                logo: {
                    '@type': 'ImageObject',
                    '@id': url + '#logo',
                    inLanguage: 'en-US',
                    url: url + '/assets/images/mLogo.png',
                    width: 2000,
                    height: 1047,
                    caption: 'Umjetnost u Drvetu'
                },
                image: {'@id': url + '#logo'}
            }, {
                '@type': 'WebSite',
                '@id': url + '#website',
                url,
                name: 'Umjetnost u Drvetu',
                description: 'Prodaja računara i elektronske opreme.',
                publisher: {'@id': url + '#organization'},
                potentialAction: [{
                    '@type': 'SearchAction',
                    target: url + '/pocetna/proizvodi/{search_term_string}',
                    'query-input': 'required name=search_term_string'
                }],
                inLanguage: 'en-US'
            }, {
                '@type': 'ImageObject',
                '@id': locationHref + '/#primaryimage',
                inLanguage: 'en-US',
                url: product.image_url,
                width: 2000,
                height: 1333
            }, {
                '@type': 'WebPage',
                '@id': locationHref + '/#webpage',
                url: locationHref,
                name: product.name,
                isPartOf: {'@id': url + '#website'},
                primaryImageOfPage: {'@id': locationHref + '/#primaryimage'},
                datePublished: '2020-04-02T22:38:08+00:00',
                dateModified: '2020-09-24T21:58:53+00:00',
                inLanguage: 'en-US',
                potentialAction: [{'@type': 'ReadAction', target: [locationHref]}
                ]
            },
                {
                    '@type': 'Product',
                    name: product.name,
                    image: product.image_url,
                    description: product.short_description,
                    review: [
                        {
                            '@type': 'Review',
                            author: 'Umjetnost u Drvetu'
                        }
                    ],
                    aggregateRating: {
                        '@type': 'AggregateRating',
                        ratingValue: '5',
                        reviewCount: '1'
                    },
                    brand: {
                        '@type': 'Brand',
                        name: 'Umjetnost u Drvetu'
                    },
                    offers: {
                        '@type': 'AggregateOffer',
                        priceCurrency: 'USD',
                        highPrice: product.price,
                        lowPrice: product.discount_price,
                        offerCount: product.quantity,
                        availability: 'https://schema.org/' + stock,
                        deliveryTime: {
                            businessDays: {
                                '@type': 'OpeningHoursSpecification',
                                dayOfWeek: [
                                    'https://schema.org/Monday',
                                    'https://schema.org/Tuesday',
                                    'https://schema.org/Wednesday',
                                    'https://schema.org/Thursday',
                                    'https://schema.org/Friday'
                                ]
                            }
                        }
                    },
                }
            ]
        };
    }

    isInStock(isInStock) {
        if (isInStock) {
            return 'InStock';
        }
        return 'OutOfStock';
    }

    getCategoryName(categories, id) {
        if (categories) {
            const category = categories.find(data => data.id == id);
            if (category) {
                return category.name;
            }
        }
    }

    public siteLinksJson() {
        const url = environment.FRONTEND_URL;
        return {
            '@context': 'https://schema.org',
            name: this.getTitle(),
            '@graph': [
                {
                    '@type': 'Organization',
                    '@id': url + '#organization',
                    name: 'Umjetnost u Drvetu',
                    url,
                    sameAs: [],
                    logo: {
                        '@type': 'ImageObject',
                        '@id': url + '#logo',
                        inLanguage: 'en-US',
                        url: url + '/assets/images/mLogo.png',
                        width: 2000,
                        height: 1047,
                        caption: 'Umjetnost u Drvetu'
                    },
                    image: {'@id': url + '#logo'}
                }, {
                    '@type': 'WebSite',
                    '@id': url + '#website',
                    url,
                    name: 'Umjetnost u Drvetu',
                    description: 'Prodaja kompjutera i elektronske opreme',
                    publisher: {'@id': url + '#organization'},
                    potentialAction: [{
                        '@type': 'SearchAction',
                        target: url + '/pocetna/proizvodi/{search_term_string}',
                        'query-input': 'required name=search_term_string'
                    }],
                    inLanguage: 'en-US'
                }, {
                    '@type': 'WebPage',
                    '@id': url + '#webpage',
                    url,
                    name: 'Umjetnost u Drvetu - Prodaja kompjutera i elektronske opreme',
                    isPartOf: {'@id': url + '#website'},
                    about: {'@id': url + '#organization'},
                    datePublished: '2020-04-06T05:43:13+00:00',
                    dateModified: '2020-07-02T20:29:00+00:00',
                    description: 'Umjetnost u Drvetu d.o.o. je kompanija koja se bavi prodajom vrhunske informatičke opreme, te pružanjem inovativnih informatičkih usluga I servisa.',
                    inLanguage: 'en-US',
                    potentialAction: [{'@type': 'ReadAction', target: [url]}]
                }]
        };
    }

    public setLogo() {
        const url = environment.FRONTEND_URL + this.router.url;
        const urlImgLogo = environment.FRONTEND_URL + '/assets/images/logo.png';
        return {
            '@context': 'https://schema.org',
            name: this.getTitle(),
            '@type': 'Organization',
            url,
            logo: urlImgLogo
        };
    }

    encodeUri(uri) {
        if (uri) {
            return StripSpecialCharsPipe.strip(uri);
        }
    }

    getTitle() {
        return this.titleService.getTitle();
    }

    public setBusinessMetaData(store) {
        return {
            '@context': 'https://schema.org',
            '@type': 'Store',
            image: [
                `${environment.FRONTEND_URL}/assets/images/logo.png`,
                `${environment.FRONTEND_URL}/assets/images/carousel/laptop.jpg`,
                `${environment.FRONTEND_URL}/assets/images/carousel/pc.jpg`,
                `${environment.FRONTEND_URL}/assets/images/carousel/periferija.jpg`,
                `${environment.FRONTEND_URL}/assets/images/carousel/toner.jpg`,
            ],
            '@id': environment.FRONTEND_URL,
            name: 'Umjetnost u Drvetu  - ' + store.name,
            address: {
                '@type': 'PostalAddress',
                streetAddress: store.address,
                addressLocality: store.city,
                postalCode: store.zip_code,
                addressCountry: 'BA'
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: store.lat,
                longitude: store.long
            },
            url: environment.FRONTEND_URL,
            telephone: store.phone,
            priceRange: '$$$$'
        };
    }
}
