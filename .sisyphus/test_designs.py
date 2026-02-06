#!/usr/bin/env python3
"""Test all five portfolio designs by taking screenshots"""

from playwright.sync_api import sync_playwright
import time

def test_all_designs():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        
        designs = [
            ("/1", "Design 1 - Brutalist"),
            ("/2", "Design 2 - Editorial"),
            ("/3", "Design 3 - Terminal"),
            ("/4", "Design 4 - Refined"),
            ("/5", "Design 5 - Geometric"),
        ]
        
        for path, name in designs:
            print(f"\nTesting {name}...")
            try:
                page.goto(f'http://localhost:5173{path}', wait_until='networkidle', timeout=10000)
                time.sleep(2)  # Extra wait for animations
                
                # Check for DesignNav
                nav = page.locator('nav').count()
                print(f"  ✓ Navigation found: {nav > 0}")
                
                # Take screenshot
                screenshot_path = f'/tmp/design{path.replace("/", "")}.png'
                page.screenshot(path=screenshot_path, full_page=True)
                print(f"  ✓ Screenshot saved: {screenshot_path}")
                
                # Check for main content
                main_content = page.locator('main, div').count()
                print(f"  ✓ Main content found: {main_content > 0}")
                
            except Exception as e:
                print(f"  ✗ Error: {e}")
        
        browser.close()
        print("\n✓ All design tests completed!")

if __name__ == "__main__":
    test_all_designs()
