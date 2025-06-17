from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://wafid.com/book-appointment/")

# Wait up to 15 seconds for the dropdown to be present
try:
    dropdown = WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.ID, "country"))
    )
    options = dropdown.find_elements(By.TAG_NAME, "option")

    for option in options:
        print(option.text)

finally:
    driver.quit()
