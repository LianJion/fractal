var test1 = $("#test");



$.Velocity.RegisterEffect("shadowIn", {
        defaultDuration: 1000,
        calls: [
            [ {opacity: 1, scale: 2},  0.4 ],
            [ {boxshadowBlur: 50}, 0.6 ]
        ]
    }).RegisterEffect("shadowOut", {
        defaultDuration: 800,
        calls: [
            //反转顺序，以In为镜像
            [ {boxshadowBlur: 50}, 0.2 ],
            [ {opacity: 0, scale: 0},  0.8 ],
        ]
    });

test1.velocity("shadowIn").velocity("shadowOut");