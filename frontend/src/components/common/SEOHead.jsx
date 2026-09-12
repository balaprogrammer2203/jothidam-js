import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SITE_METADATA, PAGE_SEO_REGISTRY } from '../../config/seo.config';

/**
 * Enterprise SEO Head Manager for React Single Page Applications (SPA)
 * Automatically syncs meta tags, OpenGraph, Twitter Cards, Multilingual Hreflang,
 * Canonical URLs and JSON-LD Schema.org Microdata on route/language changes.
 */
export default function SEOHead({
  pageKey,
  customTitle,
  customDescription,
  customKeywords,
  customImage,
  breadcrumbs = [],
  schemaOverride = null,
  noIndex = false
}) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ta';
  const location = useLocation();

  const pageConfig = PAGE_SEO_REGISTRY[pageKey] || PAGE_SEO_REGISTRY.home;

  // Resolve localized title & description
  const title =
    customTitle ||
    pageConfig.title?.[currentLang] ||
    pageConfig.title?.ta ||
    pageConfig.title?.en ||
    SITE_METADATA.siteName;

  const description =
    customDescription ||
    pageConfig.description?.[currentLang] ||
    pageConfig.description?.ta ||
    pageConfig.description?.en ||
    '';

  const keywordsList =
    customKeywords ||
    pageConfig.keywords ||
    SITE_METADATA.keywords ||
    [];

  const canonicalUrl = `${SITE_METADATA.siteUrl}${location.pathname}`;
  const ogImage = customImage || SITE_METADATA.defaultImage;

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Update HTML Lang Attribute
    document.documentElement.setAttribute('lang', currentLang);

    // 3. Helper to set or create meta tag
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 4. Helper to set or create link tag
    const setLinkTag = (rel, href, extraAttrs = {}) => {
      let selector = `link[rel="${rel}"]`;
      if (extraAttrs.hreflang) {
        selector += `[hreflang="${extraAttrs.hreflang}"]`;
      }
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
      Object.entries(extraAttrs).forEach(([k, v]) => el.setAttribute(k, v));
    };

    // Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywordsList.join(', '));
    setMetaTag(
      'name',
      'robots',
      noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    setMetaTag('name', 'author', SITE_METADATA.siteName);
    setMetaTag('name', 'publisher', SITE_METADATA.organization.name);

    // Canonical Tag
    setLinkTag('canonical', canonicalUrl);

    // Multilingual Alternate Hreflang Tags
    SITE_METADATA.locales.forEach((loc) => {
      setLinkTag('alternate', `${canonicalUrl}?lng=${loc}`, { hreflang: loc });
    });
    setLinkTag('alternate', canonicalUrl, { hreflang: 'x-default' });

    // OpenGraph Meta Tags
    setMetaTag('property', 'og:site_name', SITE_METADATA.siteName);
    setMetaTag('property', 'og:type', pageConfig.schemaType === 'Article' ? 'article' : 'website');
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:image:alt', title);
    setMetaTag('property', 'og:locale', currentLang === 'ta' ? 'ta_IN' : currentLang === 'hi' ? 'hi_IN' : 'en_US');

    // Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', SITE_METADATA.twitterHandle);
    setMetaTag('name', 'twitter:creator', SITE_METADATA.twitterHandle);
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Construct Enterprise Schema.org JSON-LD Microdata
    const schemaData = [];

    // WebSite & SearchAction Schema
    schemaData.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_METADATA.siteName,
      url: SITE_METADATA.siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_METADATA.siteUrl}/?search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      },
      inLanguage: currentLang
    });

    // Organization Schema
    schemaData.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_METADATA.organization.name,
      url: SITE_METADATA.organization.url,
      logo: SITE_METADATA.organization.logo,
      sameAs: SITE_METADATA.organization.sameAs
    });

    // Page-specific Application / Dataset / Collection Schema
    if (schemaOverride) {
      schemaData.push(schemaOverride);
    } else if (pageConfig.schemaType === 'WebApplication') {
      schemaData.push({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: title,
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'All Web Browsers',
        description: description,
        url: canonicalUrl,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR'
        },
        featureList: [
          'Vedic Kundli D1 & D9 Navamsa Charts',
          'Swiss Ephemeris Planetary Calculations',
          'KP Horary 1-249 Sub Lord Lookup',
          'Panchangam Tithis, Yogas, Karanas, and Nakshatras',
          '6 Indian Languages Support'
        ]
      });
    } else if (pageConfig.schemaType === 'Dataset') {
      schemaData.push({
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: title,
        description: description,
        url: canonicalUrl,
        keywords: keywordsList,
        creator: {
          '@type': 'Organization',
          name: SITE_METADATA.organization.name
        }
      });
    }

    // BreadcrumbList Schema (if breadcrumbs provided)
    if (breadcrumbs.length > 0) {
      schemaData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.path.startsWith('http') ? crumb.path : `${SITE_METADATA.siteUrl}${crumb.path}`
        }))
      });
    }

    // Inject Structured Data into Head
    let jsonLdScript = document.getElementById('seo-structured-data-script');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'seo-structured-data-script';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(schemaData);

  }, [title, description, canonicalUrl, ogImage, currentLang, noIndex, schemaOverride, breadcrumbs, keywordsList]);

  return null;
}
