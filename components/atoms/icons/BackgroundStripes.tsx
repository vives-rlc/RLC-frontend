import * as React from 'react'

function BackgroundStripes(props: any) {
	return (
		<svg
			width="472"
			height="360"
			viewBox="0 0 472 360"
			{ ...props }
			style={ { 'position': 'absolute', 'zIndex': '-10' } }
		>
			<path
				d="M3.93116 592.294L1049.26 -774.803M13.9601 599.963L1059.29 -767.135M23.9891 607.631L1069.31 -759.466M34.018 615.3L1079.34 -751.798M44.0468 622.968L1089.37 -744.13M54.0758 630.636L1099.4 -736.461M64.1047 638.305L1109.43 -728.793M74.1336 645.973L1119.46 -721.124M84.1627 653.641L1129.49 -713.456M94.1915 661.31L1139.52 -705.787M104.22 668.979L1149.55 -698.119M114.249 676.647L1159.57 -690.451M124.278 684.315L1169.6 -682.782M134.307 691.984L1179.63 -675.114M144.336 699.652L1189.66 -667.445M154.365 707.321L1199.69 -659.777M164.394 714.989L1209.72 -652.109M174.423 722.658L1219.75 -644.44M184.452 730.326L1229.78 -636.772M194.481 737.994L1239.81 -629.103M204.51 745.663L1249.83 -621.435M214.539 753.331L1259.86 -613.766M224.568 761L1269.89 -606.098M234.597 768.668L1279.92 -598.429M244.626 776.337L1289.95 -590.761M254.654 784.005L1299.98 -583.093M264.683 791.673L1310.01 -575.424M274.712 799.342L1320.04 -567.756M284.741 807.01L1330.07 -560.087M294.77 814.679L1340.1 -552.419M304.799 822.347L1350.12 -544.75M314.828 830.016L1360.15 -537.082M324.857 837.684L1370.18 -529.414M334.886 845.352L1380.21 -521.745M344.915 853.021L1390.24 -514.077M354.944 860.689L1400.27 -506.408M364.973 868.358L1410.3 -498.74M375.001 876.026L1420.33 -491.072M385.03 883.695L1430.36 -483.403M395.059 891.363L1440.38 -475.735M405.088 899.032L1450.41 -468.066M415.117 906.7L1460.44 -460.398M425.146 914.368L1470.47 -452.729M435.175 922.037L1480.5 -445.061M445.204 929.705L1490.53 -437.392M455.233 937.374L1500.56 -429.724M465.262 945.042L1510.59 -422.056M475.291 952.711L1520.62 -414.387M485.32 960.379L1530.64 -406.719M495.349 968.047L1540.67 -399.05M505.377 975.716L1550.7 -391.382M515.406 983.384L1560.73 -383.713M525.435 991.053L1570.76 -376.045M535.464 998.721L1580.79 -368.377M545.493 1006.39L1590.82 -360.708M555.522 1014.06L1600.85 -353.04M565.551 1021.73L1610.88 -345.371M575.58 1029.39L1620.91 -337.703M585.609 1037.06L1630.93 -330.034M595.638 1044.73L1640.96 -322.366M605.667 1052.4L1650.99 -314.698M615.695 1060.07L1661.02 -307.029M625.725 1067.74L1671.05 -299.361M635.753 1075.41L1681.08 -291.692M645.782 1083.07L1691.11 -284.024M655.811 1090.74L1701.14 -276.355M665.84 1098.41L1711.17 -268.687M675.869 1106.08L1721.19 -261.019M685.898 1113.75L1731.22 -253.35M695.927 1121.42L1741.25 -245.682M705.956 1129.08L1751.28 -238.013M715.985 1136.75L1761.31 -230.345M726.014 1144.42L1771.34 -222.676M736.043 1152.09L1781.37 -215.008M746.072 1159.76L1791.4 -207.34M756.101 1167.43L1801.43 -199.671M766.13 1175.1L1811.45 -192.003M776.159 1182.76L1821.48 -184.334M786.187 1190.43L1831.51 -176.666M796.216 1198.1L1841.54 -168.997M806.245 1205.77L1851.57 -161.329M816.274 1213.44L1861.6 -153.66M826.303 1221.11L1871.63 -145.992M836.332 1228.77L1881.66 -138.324M846.361 1236.44L1891.69 -130.655M856.39 1244.11L1901.72 -122.987M-970.37 78.8L183.072 -1429.7M-960.341 86.4682L193.101 -1422.03M-950.312 94.1369L203.13 -1414.36M-940.283 101.805L213.159 -1406.69M-930.254 109.474L223.188 -1399.02M-920.226 117.142L233.217 -1391.35M-910.197 124.81L243.246 -1383.69M-900.168 132.479L253.275 -1376.02M-890.139 140.147L263.304 -1368.35M-880.11 147.816L273.333 -1360.68M-870.081 155.484L283.362 -1353.01M-860.052 163.153L293.391 -1345.34M-850.023 170.821L303.419 -1337.67M-839.994 178.49L313.448 -1330.01M-829.965 186.158L323.477 -1322.34M-819.936 193.826L333.506 -1314.67M-809.907 201.495L343.535 -1307M-799.879 209.163L353.564 -1299.33M-789.85 216.832L363.593 -1291.66M-779.821 224.5L373.622 -1284M-769.792 232.169L383.651 -1276.33M-759.763 239.837L393.68 -1268.66M-749.734 247.505L403.709 -1260.99M-739.705 255.174L413.738 -1253.32M-729.676 262.842L423.767 -1245.65M-719.647 270.511L433.795 -1237.99M-709.618 278.179L443.824 -1230.32M-699.589 285.848L453.853 -1222.65M-689.56 293.516L463.882 -1214.98M-679.531 301.185L473.911 -1207.31M-669.502 308.853L483.94 -1199.64M-659.473 316.521L493.969 -1191.97M-649.445 324.189L503.998 -1184.31M-639.416 331.858L514.027 -1176.64M-629.387 339.526L524.056 -1168.97M-619.358 347.195L534.085 -1161.3M-609.329 354.863L544.114 -1153.63M-599.3 362.532L554.143 -1145.96M-589.271 370.2L564.172 -1138.3M-579.242 377.869L574.201 -1130.63M-569.213 385.537L584.229 -1122.96M-559.184 393.206L594.259 -1115.29M-549.155 400.874L604.287 -1107.62M-539.126 408.542L614.316 -1099.95M-529.098 416.211L624.345 -1092.29M-519.069 423.879L634.374 -1084.62M-509.04 431.548L644.403 -1076.95M-499.011 439.216L654.432 -1069.28M-488.982 446.885L664.461 -1061.61M-478.953 454.553L674.49 -1053.94M-468.924 462.221L684.519 -1046.27M-458.895 469.89L694.548 -1038.61M-448.866 477.558L704.577 -1030.94M-438.837 485.227L714.606 -1023.27M-428.808 492.895L724.635 -1015.6M-418.779 500.564L734.663 -1007.93M-408.75 508.232L744.692 -1000.26M-398.721 515.901L754.721 -992.595M-388.692 523.569L764.75 -984.927M-378.664 531.237L774.779 -977.259M-368.635 538.906L784.808 -969.59M-358.606 546.574L794.837 -961.922M-348.577 554.243L804.866 -954.253M-338.548 561.911L814.895 -946.585M-328.519 569.579L824.923 -938.917M-318.49 577.248L834.953 -931.248M-308.461 584.917L844.982 -923.579M-298.432 592.585L855.011 -915.911M-288.403 600.253L865.039 -908.243M-278.374 607.921L875.068 -900.574M-268.345 615.59L885.097 -892.906M-258.316 623.259L895.126 -885.237M-248.287 630.927L905.155 -877.569M-238.259 638.595L915.184 -869.9M-228.23 646.264L925.213 -862.232M-218.201 653.932L935.242 -854.564M-208.172 661.601L945.271 -846.895M-198.143 669.269L955.3 -839.227M-188.114 676.937L965.329 -831.559M-178.085 684.606L975.358 -823.89M-168.056 692.274L985.387 -816.222M-158.027 699.943L995.415 -808.553M-147.998 707.611L1005.44 -800.885M-137.969 715.28L1015.47 -793.216M-127.94 722.948L1025.5 -785.548M-117.912 730.616L1035.53 -777.88"
				stroke="#E00020"
			/>
		</svg>
	)
}

export default BackgroundStripes
