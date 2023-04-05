import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Directive, OnInit, Input, ElementRef } from "@angular/core";
import { take } from "rxjs";

declare var google: any;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'google-signin-button'
})
export class GoogleSigninButtonDirective implements OnInit {

    @Input('selectable')
    option: boolean = false;

    constructor(private el: ElementRef, private socialAuthService: SocialAuthService) {
    }

    ngOnInit() {
        if (!this.option) return;
        this.socialAuthService.initState.pipe(take(1)).subscribe(() => {
            google.accounts.id.renderButton(this.el.nativeElement, {
                type: 'icon',
                shape: "circle",
                size: 'large',
                text: 'signin_with',
                theme: ''
            });
        });
    }
}