import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeHtmlPipe',
    standalone: true
})
export class SafeHtmlPipe implements PipeTransform {

    constructor(private _sanitized: DomSanitizer) { }

    transform(content: string) {
        return this._sanitized.bypassSecurityTrustHtml(content);
    }
}
