// categorize elves by the common badge item which is a regular item
// every group of 3 has a common item.
// Sum of priorities of badges
//

import { calculateItemPriority } from "./a.spec"

// Get every three line
function getElfGroups(compartments: string) {
  const lines = compartments.split("\n")

  const result: string[][] = []
  let currentGroup: string[] = []

  for (let index = 0; index < lines.length; index++) {
    currentGroup.push(lines[index])
    if ((index + 1) % 3 === 0) {
      result.push(currentGroup)
      currentGroup = []
    }
  }

  return result
}

// This function takes an array that includes three strings and returns the common item on each of them.
function findBadge(compartments: string[]) {
  let badge: null | string = null

  // lets hardcode it
  // this is not appropriate normally because it doesnt scale well
  const first = compartments[0]
  const second = compartments[1]
  const third = compartments[2]

  first.split("").forEach((item) => {
    if (second.includes(item)) {
      if (third.includes(item)) {
        badge = item
      }
    }
  })

  return badge
}

function solution(compartments: string) {
  const groups = getElfGroups(compartments)
  return groups.map(group => {
    const badge = findBadge(group)
    return calculateItemPriority(badge as string)
  }).reduce((a, b) => a + b, 0)
}

describe("2nd half of day 3", () => {
  it("should categorize lines into threes", () => {
    const testInput = `ab
ba
cf
da
dv
jd`

    expect(getElfGroups(testInput)).toStrictEqual([["ab", "ba", "cf"], ["da", "dv", "jd"]])
  })

  it("should find the badge correctly", () => {
    const testInput = ["abc", "fad", "jha"]
    expect(findBadge(testInput)).toStrictEqual("a")
  })

  it("should find the solution correctly for test input", () => {
    const testInput = "abc\nfad\njha"
    const testInput2 = "abc\nfad\njha\nBac\nfBt\njkB"
    expect(solution(testInput)).toStrictEqual(1)
    expect(solution(testInput2)).toStrictEqual(29)
  })

  it("should calculate the solution for final input correctly", () => {
    expect(solution(finalInput)).toStrictEqual(2434)
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
