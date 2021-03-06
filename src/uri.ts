import { isUri, isWebUri } from 'valid-url'

import { ExtractError } from './core'
import { StringMarshaller } from './string'

var slugify = require('slugify')


export class UriMarshaller extends StringMarshaller {
    filter(a: string): string {
	if (!isUri(a)) {
	    throw new ExtractError('Expected an URI');
	}

	return a;
    }
}


export class WebUriMarshaller extends UriMarshaller {
    filter(uri: string): string {
	if (!isWebUri(uri)) {
	    throw new ExtractError('Expected an http/https URI');
	}

	return uri;
    }
}


export class SecureWebUriMarshaller extends WebUriMarshaller {
    filter(uri: string): string {
	if (uri.indexOf('https:') != 0) {
	    throw new ExtractError('Expected an https URI');
	}

	return uri;
    }
}


export class SlugMarshaller extends StringMarshaller {
    private static readonly _slugSimpleRegExp: RegExp = new RegExp('^[a-z0-9-]*$');
    
    filter(inStr: string): string {
	if (inStr.length == 0) {
	    throw new ExtractError('Expected a slug');
	}
	
	if (inStr != inStr.toLowerCase()) {
	    throw new ExtractError('Expected a slug');
	}
	
	var slug = slugify(inStr);
	
	if (inStr != slug) {
	    throw new ExtractError('Expected a slug');
	}

	if (slug[0] == '-' || slug[slug.length-1] == '-') {
	    throw new ExtractError('Expected a slug');
	}

	if (!SlugMarshaller._slugSimpleRegExp.test(inStr)) {
	    throw new ExtractError('Expected a slug');
	}

	return slug;
    }
}
