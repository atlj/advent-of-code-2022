// first half of the line is first compartment, second is the second
//
//

function getHalfOfCompartment(compartment: string) {
  const count = compartment.length
  const items = compartment.split("")
  const firstHalf = items.splice(0, count / 2)
  return [firstHalf.join(""), items.join("")]
}

function getTheSameItem(compartment: string) {
  const [firstHalf, secondHalf] = getHalfOfCompartment(compartment)

  let sameItem: null | string = null

  firstHalf.split("").forEach((item) => {
    if (secondHalf.includes(item)) {
      sameItem = item
    }
  })

  return sameItem
}

// lowercase a-z has priority 1 to 26
// uppercase A-Z has 27 to 52
export function calculateItemPriority(item: string) {
  // A starts from 65, Z ends at 90
  // a starts from 97, z ends at 122

  const code = item.charCodeAt(0)

  // uppercase
  if (code <= 90) {
    return code - 38 // 38 = 65 - 27
  }
  // lowercase
  else {
    return code - 96 // 96 = 97 - 1
  }
}

function calculateLogic(compartments: string) {
  const lines = compartments.split("\n")
  return lines.map((compartment => {
    const sameItem = getTheSameItem(compartment)
    return calculateItemPriority(sameItem as string)
  })).reduce((a, b) => a + b, 0)
}

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

describe("3rd day first part", () => {
  it("should get the half of a compartment", () => {
    expect(getHalfOfCompartment("aabb")).toStrictEqual(["aa", "bb"])
  })
  it("should get the same item correctly", () => {
    expect(getTheSameItem("aaba")).toStrictEqual("a")
    expect(getTheSameItem("123456789lkjhgfds1")).toStrictEqual("1")
  })
  it("should calcualte priority correctly", () => {
    expect(calculateItemPriority("a")).toStrictEqual(1)
    expect(calculateItemPriority("A")).toStrictEqual(27)
    expect(calculateItemPriority("C")).toStrictEqual(29)
  })
  it("should solve the test correctly", () => {
    expect(calculateLogic(testInput)).toStrictEqual(157)
  })
  it("should solve the final problem correctly", () => {
    expect(calculateLogic(finalInput)).toStrictEqual(8515)
  })
})

const finalInput = `fzmmmfwDWFzlQQqjCQjDGnqq
tJHJvLJVVttNsvTtTvgHHSVwCsQRQQZCZZMqQMQBnqBMQs
LgThNJhNSgTJVgvgtghPhbpfWzfbwfPmpprb
lDLnSnLZRjmWrlhrFF
PffQJNqJbPZbpmjrrCVNFmCh
qzbcbqfMfZMTfQTqqzzTPPLMHgBBBtHRStvgHRDBnSRL
WPZfJlZZCMwwZPWCwWzVHQhsshVSsfNQHdvQNN
FLGDGGnGdVjQQQDQ
ccFFbggLnRcLFRtFBmnJzdZZzZBMpwJlZMppMp
RZsnCZssCnDccJCnfcQfHTdzMzhdLdMTqdRqpRLwqq
tNrGNrrvGhTThQqw
rrFStPgrFWWgvmPgQjtmNtmJcfJcsJsZblDZfbfHDFHnfl
RdTfgbbPbJWDDqRvsDsmVG
NSQZLQZHpFGLqnLszrJm
ZMSNMHhNZMMSQwhQJWPBJCbhbcgtgfcJ
qZfqPvLnnZGpGpCJlvsMsMlHJJHB
mTWFFFTTtVSJMzzjWgSH
RbVdtdFtcrmbRQDDVHDQTbDNwLPLfnqZnhZhQnNwfNqnnn
nhHfSGHGThhZjnhrrSnsSczdzlfzzdQQVzRNFNcFdl
JJvCDvmCbtvpvbMmDvLbCJpmqdVVVcMcNGzRcNFcRRzRclQd
vwDCwtLmwLBDJmCHHjHHWGZHBnsnnj
QWTMqZhThbTbLwtGBrQfQQNr
jdzSSccVPPcgcLrDBtDVwCfNNC
vcBgcmssccplTnnTqsMhWW
FlcwZhBhGZhFJnGtZZFwlGsWRLHdWqMzPjWRLTLJHHjdWq
vfmrmbpfpMfzjHjfdM
VCSmVpmrNDMZhSMcsFnh
nHqQVtVZGGwwwnSF
fMBBBWCsCfMMbWfbsGmGzFjQGQFCPhFQhF
fbcsWpJRsWlcNVLtqtLLQcZQ
rgNJdfNJpgpJVMMVfmfVJgCtCTqqqzwTqrBsTswcCCss
lFLHGWLvHQFhnQFhbFnbHWWPBtwqzBPTcsPTswZCPBGCTC
QQtbRtLhtjgdfMRMDV
jTRhJpGhQPfPLsDhWh
wVVMbqbHwVwwMplHWfsfNmWcSLqcLmSs
lVCZlHnwHdRpRGvZTBGJ
csppppDDbGLbSqndFHHNdHsH
lVTlgWgjzCzfgvfggZWWlnHPPBHrSCqBmrSBrHHBnF
QFgvFfjTvZjzlvVTWljvTtMbLcccbRRMbwLMMLQLbw
tjhLjLJzpJpwjsqqfQqNrNfRnsRR
WvwGBPwWZZrnbBNrNnnC
PDvGVTgvTMGvZTGTPvWDZVJjljtLzhtmLlJjwJVJLm
WbzpSNswNWszwSLgSNMcrrBfPJJcfsHMrvMv
CFllhlGFDVFRCmhQDlDTBBcvgBCTcHPHrfrHTJ
qGRgVFhDDZmDnDqhgQFGqzwtzSjddwZbzwpLNzjpdS
FlpZrQSJJmQpSpqlQgbbRZCgGCZdDdbNdd
WswHfjfnhWPFDsFRDcbBbR
WjHvjjWTfTvHFjzvPnPtttVTTJVLtJSpmtlltp
tnjrnnnnhNlPBtbbcWpZScpjbZSz
wmsFqfqqqGHTLbzpLLbgzMcH
FGJqsmQGRVFwwQJschPdhPrBndBhtPhrQQ
dRdJRfTnCRNlJjPBDmBJsbBDzm
wSFWSgGVSLwpFhpLhQjzgPzbtDPDbPBsztrP
WMGvVMLLBCclNHHRlM
gfSffQBDBtZvwwpWDHcbwb
JnCmmJCRmztsVPJRFjFchcGGWFWcGcHFvGLvHF
VCPzJnsPVCjtPjdMsMdmVmMBfgTZBTMfSfZSSlfNNgSSfg
lwHJSVZHWWVwJQwbbVVtwWVVdpdPfRfgDLPZLTZLDLgRDTZL
hhBrBqRcnhsFFfddmdmmCmmppn
MNNBBRRshNHbtVMzQJMM
NBsSNtLNTtNsvlTBBRLgFSCbFmbHFCFhgcghSm
WJWWDdVzDZJjDJQcCDHmmhCnmHmHFm
zQVdQZQwqVQHjqzWWWdHpzMwGMBlGLLtTvRvRNsMwwNN
ZCztttSjGSqRZgRPDNQQNr
hLvmHshLmLcFwwhhwLqMVRRRJQQVNnRJMVRDNNRr
HFhTpFqqLcssmqmFftblBSjCjStjbGWBfj
crffjHDfrQfnfpLPgbgP
TmFvFCmFTFFCtNsmMsRvlRTpPbLGMnGSngPppShGpbdgGJ
vmslmwTNmtstzFsCvRFrHBrDZzcQnWqcDDHqQB
LQLPVLGdGrRPRhHgwMhllhhs
ZbSZTNqSZfNqNCtSSmTttbpSWMlzWlslpWHsWgJWhwJzBMlz
bqjqqFFjHqTTTZTmSNbfmdrFQnDdcvVDGQDvvVnQnr
mQdcdsSThlccSWhMgDnQnFtjQPtnjPNvtR
zzsGwzrrHGBfZJGrJpDtNHFjvNvDvVRvNRtV
wZBCGrbrszTbThcTcLcb
gJDDDDcPQgQfNFPhhZGDDcZZSLVtlCqzsMlzqpszlsVtFSql
bBrdwHTrHWTrTtzLlSMCCCprCq
dnBwRvmnbmBvTpbnbWbTjZPQJhhchmJcmcQPfmGNcJ
sjMGBLWGZjsLjJTBCCbvNrBCHC
mpcRfDSSdqDdlRqdwRvFrHFbrHJFJVvDVrTb
qvlgqwpcSQSfLjjhzgnMzsnP
VgmLHHNRNVLNhsNgRHLltjjbCWnCWZbldntW
GGMFPJqPwJGTvvCCdqdqlqCj
rGwGrMQzJQBjJwTVHgDQDHcsfhVhVg
pblwGBlFlWwwlgCSFwbLvQZFvzvZhzvmQTLLzJ
HfqccHzVDNqLmmPmPPQZ
MNtrVdDjHtrzGBdbGWCblw
NNhnnLdnnfhdhVjvThvqVvCj
tHtHBzBGWHBWGtPBSvvpGZVbSsTFjSqqVbscgjCjqqSC
HBtzJHzzpDZpzMWpGPtWHvZwQmNLlmQnmNdfMmNRmwmlwd
QzGqGwmbfTdPBgRRcgmMPC
NtNZhljrNjrSrtltWlCJCJJfcVVRcJcRgPjf
NlWSZZWsHhWWlprSSvZWHrWfQLLQbLGfQpQzzTFQbwzQdd
gcwcSnccnwLRRSzcBQRvZZdvtNtvRbQJQv
CqrCrrPsVstvbfDfbb
TPlPVhWFFMGMnMjbcT
gjjHGvcHgsgbSRQbRFWbjC
ttnBTNSSfwBLzplWPPdlLlMPlMCQ
TBZpDtmnnZNvhJDHggqqgS
zfqzzGwMbllcJFqm
NpHgpRZrRpSrSZLghlTjchNlNbhFmchb
RHLWHgLBggZpHpgHRZrLgZLQCMzCfDWGMCzMQQGvPmvvfC
bBWWlFFBBFdVMLfvsfjrtBvTrr
qZsgNZzcwfjZrfPf
gcnNNcDncsDGzggDnNRJnzHhmlMVSSbhVVVmMbbhVmMlGl
dNNRQszqRhPNfddWltvDltMMNlnncv
ZjZbpgpSpjpJgpCCpbFlTnSDTlzclDnMvnnMlT
GCJpjbgzJCpwZwrHZrgHsRBwBVRRsqdqPhLBQqsP
mnnVCcwGwnsVJntmfnBtBhTDzpzzpDWbDbsLLzpWDz
FcHQdZSRHbhZZWWhrW
dNljMlPPHdMPvRlHMRdjRRNBnwJfCVqwqqffCfCwtcBV
ZGtGzBBGjvdZvLWLcrPVcZcsNVNmVpcH
MnlgngCJMgJbhfDbCDPrHHVcNNrVpbVpVmmcVq
lSPhlClftSSBvdGS
jFhGqVCcPMMdGFqczBltzrtglrsrjBgB
wWgwvfDZvnpmnHwHTfNpDbtRWbzltRlSrRlbBSbbzt
fHJvJvvTwwJPhCccgQCM
BrrrBVgNppDVBbTgDvqWdWZqWqwNmNNHvH
sHsHnHlcJjFwMMFFvGdPvv
HllCQCJQJsnjgtVTbBgpQrSr
JgLPLwbhBrCbLBCJPFFlPFZRTNTZFRqlRq
pmffSWvDcfSfGmvsNHZsTRsWllssbT
vDddMmScdStfzGcpzzwhJwJwnCbLwwLLCwht
sWSSvmsZsdZPWdLPRRsmSrrnlnvJjfnggfrgtfjnjr
VWWWBhhHBBHtljMMfJHrrt
WWqpWVqQqLNGRNZP
QHjjGVBQpffpjqppQsSsQHWJcVVgJFWcFTWgNLggFPNc
bzzmbzzZnZztFTNJWRqmqcgJ
zDZlqMtbwhCBBfppvHDGvf
BNTdfWJmzHNHHzzTdLCfCfCswQjRjljVsh
FbGnrFnrPGSSvGPFZFFPGClLQpjQRwLjLplQhRlsrQ
GbnvvgvPFwbwcnZMMGSFvFHdNHmTBNJNmmmDTJDBmWcT
rBhRPrjJrRtTHtWHWcjc
SDdGqmhdFSqblLGlHHfHWl
DSSmFqhsFqFdzqFgwsVnvBQPPQPQVrnRsJMR
NZcgQdmSwZgdPFPVNFPqqVVF
hlhhjMhGjLhLDGDhCBJDCrRFRrqqpLPfpfPRVPprPm
MlhjlMDDJTCmZddQQSTcTT
zRddrwzwNhrzrtCLtLfsLrqflC
MbSDZvVwGZpJwvHvBVfsqtjqlsPPfsqsfclb
vJpvJvZTVgTdTgwdTn
SZMsTTScDMqwtDDJ
VWrbzFvnrvFQQtnhzdPFmfwGfqmGPfDwmfPJ
rrLbrnVrLvVQpLHSHjsTBBjZBt
bSrpbWpPpfzPRWrWvhJgddrcccgFnFss
ljGNTCtMNLGQjNMjQMGtZJDDggcldcFcvhdFddnhhF
vNCmQMjmvGzpRPPzzmfw
BrbdcqcdSZRLQltNDqFpCpHH
jnTzWsWjWjwTQnzMvFlCzNDhNhDCFGpHpH
wmmvjVQMvwmsQMMwnsTPgVfgJcLcgfSbbBdBbJSdbSBS
bJFbMdcmgFSFgmggJFcGwjRdzPWZWGDDGGRwGD
hrttffCVVCTVlrttQwzRzwWTqRGDGwjTvG
rfLChHhlpHrfHlnWlpWCpQVcMSmMmSJMmggbmMSMLFNSSs
JRMBJfMJQJTcNNdD
LHsLmspghmmpdwwwcwRCpPTT
ttLLlRSlqjrMqFtZ
VjtHVHtvVqttCdnGpHtplcshglNgprrlMhrcNghw
WTWRvRWFZQLWDvDWzwscNfcflcshlshFlw
WQmBQWPTVGnJPnvn
cpRwjcQwVfQzQPQl
BZgGDBZBsgWBDDJzlhfhJVmzVfmThm
FqWDDGrGDFNqFrDZFnplNHnSwtnSRwRplN
VMLVRhRLRfhfgGdfVdZWRdTHNqHCDTrSJNBBBgJNQgND
swlcpsFPcPwzpSlTTDrNrQPQqQBBrH
zsppFscsscmbzsFsbsZbMfRZdVdVMbVSWhLG
NjcjHFjrHHFpjGtVtGWVZW
fwPlsJqdndPnwJfQdfllwNtWGdtWMMbtbmbGWbMWGN
CPlwnCwnwqClTJThTDzzFcHNSShrRh
llqlsNsPNTpDNTDNNf
cnvcWFjSrMSFnvWHTzTggHCcllzLpg
wjJSSrFrrMMJGrFFFGjGvJnFswsRwRdmBdZbbqqsPtQqPZls
jlclpqjcRqpjzjnVPgTmBmjCrC
vGvsFNGGMZNvdGshQNJvJgbVMrnbrHVBgBTTbBBPBT
SvJNGhvvvFdfQvFshSpqPqLzRRPctRcLWwlf
LWSSqLVBbNqqLrWHLSHzWbbqQfFgZtmtJCQZzgtCFCQCCnJQ
PlldGDGdjGsMPhssjPmQZFJQQZQghChZQJgv
jwMcMpsPRRdsRjPwNpTWBLSBqVqTNJWT
hWnMWgTffWFbMLfHnFMNfHgjtBSNRzjBBSzSBBcStdzBtz
VGrVCGcVJswvPqJQjtQppBzpSwdjpt
ZqqsCrmmsfmWcHhngg
vnNnssMcZnlnlMFMsnFcZMGqJCbLbNLNqgLbgLNTCpLgwC
hmjzBzHmRSfBfmqgQwpQQJbQJmwT
WVVtthRtRdsdqtddZd
LhZBLfZpmcsFpFzm
vTRRwTRRPnCTwlFgmsczzLmgLvFs
HVVVNCPPHTTtClRVNSnwLTHSQHBMMHrHWBhrQbJhWMMbZbJZ
WPTnnDPjvPlChhJPcgCC
DRQdBqsDQHQLHsBSmVLBcbwgCClbgCGlJghgmhgw
dHMHQDVVRBsMWTNfWfzWzf
PlgFPFFJGgJhhMGZwGbpBtQjjjStBttptlSb
TTcDzmHvdvnDDzdTVnTDmSspWspQLpWmSsmqppsWtb
CHVdcHvdbrwJCMPRGJwP
BtBfcPfBhBGDhwHMlCmrNSCM
dQdzLFTQnRnQVvgLnNlrCCpFrJCNrHJrwm
zRVLZQRRvQGbwtWfbGZb
PPcWcwMmCwwgnphCCLpjHp
TtZsJTzzJSSSZJsdJtTrpblhRlHHHMngpLnnjHps
ZDrvdFZtJqtStrZfMcGDVwfwffmWmP
wCwSzzsHChhMVMhCPsSVLFWcdcWGPccRdjFdJjDR
wBTTlBfgTlfpQQltmfgGGctRdGJJJFDJDDWdDt
TppwnmlnQQqnlpqlmmwqlpphHqrVrZZSzshzShqzsrZVqs
CCqCTgmdMCCCMMsWgqqnTCmJDGJcGGJfrGNGrSrrQpwFFSwG
vZbDZvhDbzHzwNzwNGFNpNGc
ZjBRVHPRtRLjLMWsCDlmgMdBmW
MMsstRChwbChqRBqDrJNpNDsHdlNlJdr
vLmPLfGGGGcTmFfTSgvPCvpZQlHHZpdrFJplQdZHQdHH
GgPLmvGVSPfmfcfgBtjwCRwwjBbtVWbh
LPPgFPccLPRswfsHfJgDsH
bpbpTnCCrnmCtjBnTfDshHDwQVTwsDhQ
BbrjnjnWCbBWZbPWzLDzDWdNlMWS
pnncvLbcppBHgBRpddGd
MtJfjVMtMmFJDjWSjVWzGdGgNQRBzBGNBMCGNB
ZdDdsJFdDmtJmLTbwcvcbcnwZv
FGsfFdNdhfbDdbhbLMhbNNTPJVCCZTLJnCRVJLPCRTVR
qHjsczptHpmgHZBBVVTrrPzrBP
lmpSlcglQtqWtcWjpQQfWsGDMhGFwdbGGNWhDv
hNNNjMFMwthjFfvZBjFFvNSdnzSGGdGmHzHgGWSfHWSR
ppJpcCVslpQJpJJDWHCHmRHHWWGSDn
QbsrJQTQJVJNMNnZTZNZvZ
NmRNLtGNmfcRrtDtrJCnWHJD
blSzzSBssgfslWCCCJWFWHrsZF
zTzbPBhMlTVSzMlMldlgMvvvvMLGcQRmqLLfvRwQ
nnZsfsPLLfZfHLWdsZWZHdmcSpTcGmNScJTRGsTJmNcF
gqVqDMgBlDbwwCqVbQFpTNFcTRSJNSrqqTSm
jlMVMjljQBjMwhLfWWzhhfhZtmLH
bfHwMvzwFBNpRjfZ
nddcVJpGVpGqPVBBFBmhBhmsNRJs
DWcPgPcPgnqCPlWWVWGMwbzwvQSSLbvgLpHHMz
NMVqtdPVHgVlrfVrpnjCwNjjpCpNNpCb
zhSvfWWzRfRLfvSpQjwbmmmvQvwwCD
LBRRTRcLJSgqqMJlVVft
GpgNzzSMGpGTrgzgMzJTrPgzjRwBdBlBbLRBjdBwVbLRVbSR
sQWCfQcflhtQQcWCmsmlsbLnRdwqqBmmbBVbLVLwnB
fCtQWFWDZFCQhCctFDsftNpzPPzZJpgJJNTgNlPZgH
DqLtMSDLLttjdDSRdjZtdpdqVWFslFWrqWPqhwhfFwwCFw
CvTbNvvTJNGHnVJwPfwFFFwsrh
cQBzGBHnTQGgcNtdMMBpDBtCdtLL
QsNDfdDNQsSTtrQZQtJJZC
lLvRWMVMLzWbRjvVgVVGvmTtCrZBrTFFbmJCmsBCrr
lljvlgpMGgRpsjsRlGGsMdqDdpDqNqfhqqSdncpqdP
sVSJVmmtmsCCwschrbNMbcBs
ZgLLfqvzzqgfdqHQLnTLfQQFhFMrhbNGBwgGbMlNcFclwN
LTzqZrHHQvjLHnHdQTdTQvZQJjCpCJDPmCRRtCpStRRmVtmm
ccQVcVHwnnDqNqSWNnVvqwcgJblgRslgmdGlssmGbQdddb
rpFtPrzrMFZvZTLPpglhdssFshssJhsggG
pTtLtBMjZLfHvNWqcBHf
PZnSjnnsVfjfLLff
crvccpglrtHfNbzbHLzmGN
lptTLFFpdgvttFWltTclplDvhJMSMPhJPhChShPBZBMJhPMT
mPSPdnhznPdhSmPGchJdFDtBhghgFgWpFBQhTBMg
rHNNvbqHHHwZwMGMWtgtQMZQFQ
wRqqRffvvNHwrHqrNqLvCrqvmPnzdsGJsSsSdSsLPVVPnjsn
CzlngWpClJlzRJpDnpmzCndrhBcrhwcsBcLsNcsmLdQQ
qqSjqFGTFbPFSPTVjcBcBsDdQrwBVLrNcc
PtDDtZTvGDvFCMzZlRJCfWfJ
vtQDpvpvVvvcSFrrljZZsVjFrV
RqcTTRddRrlsjZrwrT
zmbdRdMmMgbPDcGhGmnDpcQn
gZqJRZRZdltFVGZQDZwV
MCMSRHCMRHBBVtVCGwDCFGtD
jcHsTMBNSSrBMjmMrcTMpRqpJggllnprqzRPzdlP
mWSWHdmHWZWjBnGs
TvchwtTfcTvhzwVGNtdrbjnnBnsnNr
JTdwghvMzwfdcMVJqPmQFRPpCDJRJFFC
DsHDCrszvvhHsshvsrrsgwdPpdLFgWLpbRpWFfMjWjWF
BVJPJmPmGZVnfbVfMWpdLMWb
cNGtnttqmJHNvNzDPPHN
gpjmMQMrfmMntCSCNmSNCm
vDRqphDhzHSdtqdCNH
LFLLcbJRJLppFQlpMFfF
SnSdvchzZZczndNvwcwnQrGfqrTTfhhTDgRGGLQQ
lVWHWMmWmttsFBMLLqLTRRRqqDBGTf
bsFPbFFssmFjWRmjVFjHbczvpZCwvwZccndpvzpzCP
jzngbHrlHQllcbcTCtHGWtftGCHqWC
JJgmsJRwFqChLGtqGs
SmJmSmDdSPRwSMppJdPPwVvvzNQvjrNMNjMZZrQgZNgQ
PvPlPcZPZFllzNzCDdhhdHjrpHNjHBHB
VmgWtJWrqbQmqGDBdGQjjhBGdG
tmbgggbgnMWnStttgnfnTzrCfPvFnccnPclT
RQQbdSRdpprQSNVqqqfrffjvnjnJnhnVvHhBhVjJtjJz
WGgGgLmLgGZMPDBhDJDHjMBFnD
WPPwPGwlLgZwmWlslCLRNbrsTrfRrNNQqsspBT
dNNpHpchLppdccTNtZZTRRPSSnwPPSbSnhhrhnSJ
qfqsFsqffgQMznJrPznbMrrB
vglfqQCgDgFjglCDCjLZpTHNPHttdcZVVN
FWtDHDStZwrFCDwrgWPFDsWQJZzlMdpZzlNpNjdjjQzNzj
BqnVGVcbTmGfHLGVzvpQpvJvQlflMdJp
ThRRchnHqLTGbFCCCrrSSFhFCs
wJrwdZPnJwqPbJPCnjFZdvHtMvsLsTsDtHsHDDqvpH
RWzNRWjRfgjNMMLvcMcLNt
WGGRQzzRmRmVQSgwrwJjjCbJhnbShJ
cjngcvcwbMwWnbMWjbgvnsjPftsqfthqsBtsJJJJBt
HrGFmDDzpmLTHpDsPfsBNBPfzZNPqN
DDVmDplDrpGSVSTTHGlpLnPwCRnWcvWCdPbbMvcVdW
BVRlBfPBffWswVWQsfwBNNPMFMmmGFZGnWZGtztrzMZMnz
HqSJchHTHbTgHhGhvmRzFmnFtzRF
RJqHTpgDLJDSqLJJPNVjsfPwBVsVLlfN
NDrBlSmrFBlbbJllmtHHwhNNhZztqHVRzQ
CMTCGLcvvtfCdCcCvCnMTMcTzjHwVZVRLjRRjQjRHRwzwjVH
dfGdgGMGPggnvfvgbtDtlSJPDSFJPslJ`
