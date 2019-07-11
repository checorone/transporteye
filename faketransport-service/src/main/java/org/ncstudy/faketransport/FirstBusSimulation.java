package org.ncstudy.faketransport;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class FirstBusSimulation {

    private Activators activators;
    private int i = 0;
    private Transport bus;

    public FirstBusSimulation(Activators activators) {
        this.activators = activators;
        activators.setAccessToken(RequestUtil.prepareAccessToken());
        bus = RequestUtil.prepareTransport(3);

    }

    @Scheduled(fixedDelay = 3000)
    public void busSimulator() {
        if (activators.isRunBuses()) {
            bus.setLongitude(lng1[i]);
            bus.setLatitude(lat1[i]);
            RequestUtil.sendTransport(bus, activators.getAccessToken());
            if (++i == lat1.length)
                i = 0;
        }
    }

    private final static double[] lat1 = {
            55.74494842749842,
            55.74468270955214,
            55.7442297770636,
            55.74366813347604,
            55.74281659390755,
            55.74204590248841,
            55.74138759439023,
            55.741049376737,
            55.74059640207385,
            55.74071831829338,
            55.74104747937576,
            55.74133436062358,
            55.741752725522765,
            55.7422298445492,
            55.74277495003422,
            55.74327923334084,
            55.74376539251444,
            55.74436024984711,
            55.74472863410509,
            55.74511815138175,
            55.745388015717566,
            55.745720156863776,
            55.7461247613492,
            55.74651124529777,
            55.74680412511519,
            55.74638141127331,
            55.745973790016954,
            55.74568090396655,
            55.745224963574735,
            55.74472976400098,
            55.74436741886771,
            55.74405036411588,
            55.74372424796913
    };

    private final static double[] lng1 = {
            37.6041908650202,
            37.60263518379156,
            37.602045097808286,
            37.60145501182501,
            37.60044650123541,
            37.59966561891531,
            37.59874293901419,
            37.59821722604727,
            37.59744474985098,
            37.59783865682971,
            37.59831072561633,
            37.59882570974719,
            37.59942406621826,
            37.59992832151306,
            37.60050915148804,
            37.60106168654511,
            37.601582035094,
            37.60231403964963,
            37.60294167655911,
            37.60374097484555,
            37.604219065665006,
            37.60489498233676,
            37.60566745853305,
            37.60632972565429,
            37.60678570118682,
            37.605712817580866,
            37.60494034138458,
            37.60439853516357,
            37.60358314362304,
            37.602708743484186,
            37.602134750755,
            37.601759241492914,
            37.601464198501276
    };
}
