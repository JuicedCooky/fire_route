#!/usr/bin/env python3
"""Scrapes property reviews from cottagesincanada.com and writes them to
fire_route/public/reviews.json for the site to consume."""

import json
from datetime import datetime, timezone
from pathlib import Path

import requests
from bs4 import BeautifulSoup

LISTING_URL = "https://www.cottagesincanada.com/42737"
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "fire_route" / "public" / "reviews.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
    )
}


def fetch_html(url):
    response = requests.get(url, headers=HEADERS, timeout=30)
    response.raise_for_status()
    return response.text


def parse_reviews(html):
    soup = BeautifulSoup(html, "html.parser")

    reviews = []
    for node in soup.select('div[itemprop="review"]'):
        author_el = node.select_one('[itemprop="author"] [itemprop="name"]') or node.select_one(
            '[itemprop="name"]'
        )
        rating_el = node.select_one('[itemprop="reviewRating"] meta[itemprop="ratingValue"]')
        body_el = node.select_one('[itemprop="reviewBody"]')

        reviews.append(
            {
                "author": author_el.get_text(strip=True) if author_el else None,
                "rating": float(rating_el["content"]) if rating_el and rating_el.has_attr("content") else None,
                "text": body_el.get_text(strip=True) if body_el else None,
            }
        )

    aggregate_el = soup.select_one('[itemprop="aggregateRating"]')
    aggregate = None
    if aggregate_el:
        rating_meta = aggregate_el.select_one('meta[itemprop="ratingValue"]')
        count_meta = aggregate_el.select_one('meta[itemprop="reviewCount"]')
        aggregate = {
            "rating": float(rating_meta["content"]) if rating_meta and rating_meta.has_attr("content") else None,
            "count": int(count_meta["content"]) if count_meta and count_meta.has_attr("content") else None,
        }

    return aggregate, reviews


def main():
    html = fetch_html(LISTING_URL)
    aggregate, reviews = parse_reviews(html)

    data = {
        "source": LISTING_URL,
        "scrapedAt": datetime.now(timezone.utc).isoformat(),
        "aggregate": aggregate,
        "reviews": reviews,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {len(reviews)} reviews to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
