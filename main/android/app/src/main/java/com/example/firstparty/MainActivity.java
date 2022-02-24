package com.example.firstparty;

import android.os.Build;
import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
// import android.support.annotation.Nullable;


import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import expo.modules.ReactActivityDelegateWrapper;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // Set the theme to AppTheme BEFORE onCreate to support 
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
    super.onCreate(null);
  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "main";
  }

  // @Override
  // protected ReactActivityDelegate createReactActivityDelegate() {
  //   return new ReactActivityDelegateWrapper(this,
  //     new ReactActivityDelegate(this, getMainComponentName())
  //   );
  // }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new POCReactActivityDelegate(this, getMainComponentName());
  }

  public static class POCReactActivityDelegate extends ReactActivityDelegate {
    // private final @Nullable Activity mActivity;
    // private @Nullable Bundle mInitialProps;
    private final Activity mActivity;
    private Bundle mInitialProps;

    public POCReactActivityDelegate(Activity activity, String mainComponentName) {
        super(activity, mainComponentName);
        this.mActivity = activity;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        mInitialProps = mActivity.getIntent().getExtras();
        super.onCreate(savedInstanceState);
    }

    @Override
    protected Bundle getLaunchOptions() {
        return mInitialProps;
    }
  }

  /**
   * Align the back button behavior with Android S
   * where moving root activities to background instead of finishing activities.
   * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
   */
  @Override
  public void invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        // For non-root activities, use the default implementation to finish them.
        super.invokeDefaultOnBackPressed();
      }
      return;
    }

    // Use the default back button implementation on Android S
    // because it's doing more than {@link Activity#moveTaskToBack} in fact.
    super.invokeDefaultOnBackPressed();
  }
}
