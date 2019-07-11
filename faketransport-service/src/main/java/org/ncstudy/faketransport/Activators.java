package org.ncstudy.faketransport;

class Activators {
    private boolean runBuses = true;
    private boolean runStatistic;
    private String accessToken;

    public boolean isRunBuses() {
        return runBuses;
    }

    public void setRunBuses(boolean runBuses) {
        this.runBuses = runBuses;
    }

    public boolean isRunStatistic() {
        return runStatistic;
    }

    public void setRunStatistic(boolean runStatistic) {
        this.runStatistic = runStatistic;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
