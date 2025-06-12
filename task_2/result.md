# 1. Title  
Logout button is unresponsive on Safari browser

# 2. Description  
When attempting to log out of the application using the logout button, the button does not respond in the Safari browser. There is no feedback or action upon clicking the button, and the user remains logged in. This issue appears to be isolated to Safari, as the logout functionality works correctly on other browsers such as Chrome and Firefox.

# 3. Steps to Reproduce  
1. Open the application in Safari browser.  
2. Log into the application with valid credentials.  
3. Click on the logout button (usually located in the top-right corner or user menu).  
4. Observe the behavior.

# 4. Expected vs Actual Behavior  
**Expected:**  
Clicking the logout button should log the user out, redirecting them to the login page or homepage and ending the session.  

**Actual:**  
Clicking the logout button does nothing. The user remains logged in with no visual or functional feedback.

# 5. Environment (if known)  
- Browser: Safari (exact version unknown)  
- Operating System: macOS (exact version unknown)  
- Device: MacBook or similar  
- App Version: Unknown

# 6. Severity or Impact  
**High**  
Logout functionality is a critical security feature. If users are unable to log out on Safari, it could lead to security risks, especially on shared or public devices.

# 7. Verification  
After the fix, test the logout button in Safari to ensure it properly logs the user out and redirects them appropriately. Also, verify session termination on the backend.
