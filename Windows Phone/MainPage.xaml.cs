using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;

namespace ImageCards
{
    public partial class MainPage : PhoneApplicationPage
    {
        private string MainUri = "/index.html";

        public MainPage()
        {
            InitializeComponent();
        }

        /// <summary>
        /// Indicates if any dialog is visible. Used by the back button logic.
        /// </summary>
        public bool IsDialogVisible { get; set; }

        private void Browser_Loaded(object sender, RoutedEventArgs e)
        {
            Browser.Navigate(new Uri(MainUri, UriKind.Relative));
        }

        // Navigates back in the web browser's navigation stack, not the applications.
        private void BackApplicationBar_Click(object sender, EventArgs e)
        {
            Browser.GoBack();
        }

        // Navigates forward in the web browser's navigation stack, not the applications.
        private void ForwardApplicationBar_Click(object sender, EventArgs e)
        {
            Browser.GoForward();
        }

        // Navigates to the initial "home" page.
        private void HomeMenuItem_Click(object sender, EventArgs e)
        {
            Browser.Navigate(new Uri(MainUri, UriKind.Relative));
        }

        // Handle navigation failures.
        private void Browser_NavigationFailed(object sender, System.Windows.Navigation.NavigationFailedEventArgs e)
        {
            MessageBox.Show("Navigation to this page failed, check your internet connection");
        }

        private void Browser_LoadCompleted(object sender, NavigationEventArgs e)
        {
            Browser.InvokeScript("changeTheme", App.IsDarkTheme ? "Dark" : "Light");
        }

        private void Browser_ScriptNotify(object sender, NotifyEventArgs e)
        {
            switch (e.Value)
            {
                case "onload":
                    OnLoad();
                    break;
                case "opendialog":
                    IsDialogVisible = true;
                    break;
                case "closedialog":
                    IsDialogVisible = false;
                    break;

            }
        }

        private void OnLoad()
        {
            var text = Resource.RenderJson();
            Browser.InvokeScript("Initialize", text);
        }

        private void PhoneApplicationPage_BackKeyPress(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if (IsDialogVisible)
            {
                e.Cancel = true;
            }

            var result = Browser.InvokeScript("BackButton");
        }
    }
}