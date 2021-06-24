import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartComponent} from './cart/cart.component';
import {ContactComponent} from './contact/contact.component';
import {WishlistComponent} from './wishlist/wishlist.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {PagesRoutingModule} from './pages-routing.module';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AboutUsComponent} from './about-us/about-us.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {OrderSuccessComponent} from './order-success/order-success.component';
import {ReferencesComponent} from './references/references.component';
import {ServiceComponent} from './service/service.component';
import {FiscalizationComponent} from './fiscalization/fiscalization.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';
import {ReturnPolicyComponent} from './return-policy/return-policy.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {PaymentTypesComponent} from './payment-types/payment-types.component';
import {FaqComponent} from './faq/faq.component';
import {DeliveryComponent} from './delivery/delivery.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PagesRoutingModule,
        SharedModule,
        NgxSkeletonLoaderModule,
        MatSlideToggleModule
    ],
    declarations: [
        CartComponent,
        ContactComponent,
        WishlistComponent,
        CheckoutComponent,
        AboutUsComponent,
        ReferencesComponent,
        ServiceComponent,
        FiscalizationComponent,
        ErrorPageComponent,
        OrderSuccessComponent,
        TermsAndConditionsComponent,
        ReturnPolicyComponent,
        PrivacyPolicyComponent,
        PaymentTypesComponent,
        FaqComponent,
        DeliveryComponent
    ]
})
export class PagesModule {
}
